"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder-v3");
const ConversationUpdate_1 = require("./ConversationUpdate");
const models_1 = require("./models");
var MentionTextLocation;
(function (MentionTextLocation) {
    MentionTextLocation[MentionTextLocation["PrependText"] = 0] = "PrependText";
    MentionTextLocation[MentionTextLocation["AppendText"] = 1] = "AppendText";
})(MentionTextLocation = exports.MentionTextLocation || (exports.MentionTextLocation = {}));
class MentionEntity {
}
exports.MentionEntity = MentionEntity;
class UserMention extends MentionEntity {
    constructor(user, text) {
        super();
        if (!user || !user.id) {
            throw new Error('Mentioned user and user ID cannot be null');
        }
        if (!user.name && !text) {
            throw new Error('Either mentioned user name or mentionText must have a value');
        }
        let mentionEntityText = text || user.name;
        this.type = 'mention';
        this.text = '<at>' + mentionEntityText + '</at>';
        this.mentioned = {
            'id': user.id,
            'name': mentionEntityText,
            'type': 'user'
        };
    }
}
exports.UserMention = UserMention;
class ChannelMention extends MentionEntity {
    constructor(channel) {
        super();
        if (!channel || !channel.id) {
            throw new Error('Mentioned channel and channel ID cannot be null');
        }
        if (!channel.name) {
            throw new Error('Channel name must have a value. General channel will not have name, need to set name as General mannually');
        }
        this.type = 'mention';
        this.text = '<at>' + channel.name + '</at>';
        this.mentioned = {
            'id': channel.id,
            'name': channel.name,
            'type': 'channel'
        };
    }
}
exports.ChannelMention = ChannelMention;
class TeamMention extends MentionEntity {
    constructor(team) {
        super();
        if (!team || !team.id) {
            throw new Error('Mentioned team and team ID cannot be null');
        }
        if (!team.name) {
            throw new Error('Team name must have a value');
        }
        this.type = 'mention';
        this.text = '<at>' + team.name + '</at>';
        this.mentioned = {
            'id': team.id,
            'name': team.name,
            'type': 'team'
        };
    }
}
exports.TeamMention = TeamMention;
class TeamsMessage extends builder.Message {
    constructor(session) {
        super(session);
        this.session = session;
    }
    addMentionToText(mentionedUser, textLocation = MentionTextLocation.PrependText, mentionText) {
        console.warn("new TeamsMessage(session).addMentionToText is deprecated. Use UserMention or ChannelMention instead.");
        if (!mentionedUser || !mentionedUser.id) {
            throw new Error('Mentioned user and user ID cannot be null');
        }
        if (!mentionedUser.name && !mentionText) {
            throw new Error('Either mentioned user name or mentionText must have a value');
        }
        if (mentionText) {
            mentionedUser.name = mentionText;
        }
        var mentionEntityText = '<at>' + mentionedUser.name + '</at>';
        this.data.text = !this.data.text ? '' : this.data.text;
        if (textLocation == MentionTextLocation.AppendText) {
            this.text(this.data.text + " " + mentionEntityText);
        }
        else {
            this.text(mentionEntityText + " " + this.data.text);
        }
        this.addEntity({
            'mentioned': {
                'id': mentionedUser.id,
                'name': mentionedUser.name
            },
            'text': mentionEntityText,
            'type': 'mention'
        });
        return this;
    }
    static getConversationUpdateData(message) {
        if (message.sourceEvent) {
            var channelData = message.sourceEvent;
            if (channelData.eventType) {
                var team = this.populateTeam(channelData);
                var tenant = this.populateTenant(channelData);
                switch (channelData.eventType) {
                    case 'teamMemberAdded':
                        var members = this.populateMembers(message.membersAdded);
                        return new ConversationUpdate_1.MembersAddedEvent(members, team, tenant);
                    case 'teamMemberRemoved':
                        var members = this.populateMembers(message.membersRemoved);
                        return new ConversationUpdate_1.MembersRemovedEvent(members, team, tenant);
                    case 'channelCreated':
                        var channel = this.populateChannel(channelData);
                        return new ConversationUpdate_1.ChannelCreatedEvent(channel, team, tenant);
                    case 'channelDeleted':
                        var channel = this.populateChannel(channelData);
                        return new ConversationUpdate_1.ChannelDeletedEvent(channel, team, tenant);
                    case 'channelRenamed':
                        var channel = this.populateChannel(channelData);
                        return new ConversationUpdate_1.ChannelRenamedEvent(channel, team, tenant);
                    case 'teamRenamed':
                        return new ConversationUpdate_1.TeamRenamedEvent(team, tenant);
                }
            }
            throw new Error('EventType missing in ChannelData');
        }
        else {
            throw new Error('ChannelData missing in message');
        }
    }
    static getGeneralChannel(message) {
        if (!message) {
            throw new Error('Message can not be null');
        }
        if (message.sourceEvent) {
            var channelData = message.sourceEvent;
            var team = this.populateTeam(channelData);
            if (team) {
                return new models_1.ChannelInfo(team.name, team.id);
            }
        }
        return null;
    }
    routeReplyToGeneralChannel() {
        var team = this.session.message.sourceEvent.team;
        if (!team) {
            throw new Error('Team cannot be null, session message is not correct.');
        }
        var teamId = team.id;
        var conversation = this.data.address.conversation;
        this.data.address.conversation.id = teamId;
        return this;
    }
    static getTenantId(message) {
        if (!message) {
            throw new Error('Message can not be null');
        }
        var channelData = message.sourceEvent;
        if (channelData) {
            var tenant = this.populateTenant(channelData);
            if (tenant) {
                return tenant.id;
            }
        }
        return null;
    }
    static getTextWithoutMentions(message) {
        var text = message.text;
        if (message.entities) {
            message.entities
                .filter(entity => entity.type === "mention")
                .forEach(entity => {
                text = text.replace(entity.text, "");
            });
            text = text.trim();
        }
        return text;
    }
    static populateMembers(members) {
        var ret = [];
        if (!members)
            return ret;
        for (var i in members) {
            var member = members[i];
            if (!member.id && !member.name)
                continue;
            var account = {
                name: member.name,
                id: member.id
            };
            ret.push(account);
        }
        return ret;
    }
    static populateTeam(channelData) {
        if (!channelData || !channelData.team)
            return null;
        return new models_1.TeamInfo(channelData.team.name, channelData.team.id);
    }
    static populateTenant(channelData) {
        if (!channelData || !channelData.tenant)
            return null;
        return new models_1.TenantInfo(channelData.tenant.id);
    }
    static populateChannel(channelData) {
        if (!channelData || !channelData.channel)
            return null;
        return new models_1.ChannelInfo(channelData.channel.name, channelData.channel.id);
    }
}
exports.TeamsMessage = TeamsMessage;
TeamsMessage.alertFlag = { 'notification': { 'alert': true } };
