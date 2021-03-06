"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder-v3");
const msRest = require("ms-rest");
const RemoteQuery = require("./RemoteQuery/teams");
const RestClient = require("./RemoteQuery/RestClient");
const task = require("./models/TaskModuleResponse");
var WebResource = msRest.WebResource;
class TeamsChatConnector extends builder.ChatConnector {
    constructor(settings = {}) {
        super(settings);
        this.queryHandlers = null;
        this.allowedTenants = null;
    }
    fetchChannelList(serverUrl, teamId, callback) {
        var options = { customHeaders: {}, jar: false };
        var restClient = new RestClient(serverUrl, null);
        var remoteQuery = new RemoteQuery(restClient);
        this.getAccessToken((err, token) => {
            if (!err && token) {
                options.customHeaders = {
                    'Authorization': 'Bearer ' + token
                };
                remoteQuery.fetchChannelList(teamId, options, callback);
            }
            else {
                return callback(new Error('Failed to authorize request'), null);
            }
        });
    }
    fetchTeamInfo(serverUrl, teamId, callback) {
        var options = { customHeaders: {}, jar: false };
        var restClient = new RestClient(serverUrl, null);
        var remoteQuery = new RemoteQuery(restClient);
        this.getAccessToken((err, token) => {
            if (!err && token) {
                options.customHeaders = {
                    'Authorization': 'Bearer ' + token
                };
                remoteQuery.fetchTeamInfo(teamId, options, callback);
            }
            else {
                return callback(new Error('Failed to authorize request'), null);
            }
        });
    }
    fetchMembers(serverUrl, conversationId, callback) {
        var options = { customHeaders: {}, jar: false };
        var restClient = new RestClient(serverUrl, null);
        var remoteQuery = new RemoteQuery(restClient);
        this.getAccessToken((err, token) => {
            if (!err && token) {
                options.customHeaders = {
                    'Authorization': 'Bearer ' + token
                };
                remoteQuery.fetchMemberList(conversationId, options, callback);
            }
            else {
                return callback(new Error('Failed to authorize request'), null);
            }
        });
    }
    fetchMember(serverUrl, conversationId, memberId, callback) {
        var options = { customHeaders: {}, jar: false };
        var restClient = new RestClient(serverUrl, null);
        var remoteQuery = new RemoteQuery(restClient);
        this.getAccessToken((err, token) => {
            if (!err && token) {
                options.customHeaders = {
                    'Authorization': 'Bearer ' + token
                };
                remoteQuery.fetchMember(conversationId, memberId, options, callback);
            }
            else {
                return callback(new Error('Failed to authorize request'), null);
            }
        });
    }
    fetchMembersWithPaging(serverUrl, conversationId, ...args) {
        let pageSize = undefined;
        let continuationToken = undefined;
        let callback;
        let throwInvalidParameter = () => {
            throw new Error('Invalid parameters: ' + JSON.stringify(args));
        };
        if (!args) {
            throwInvalidParameter();
        }
        switch (args.length) {
            case 1:
                callback = args[0];
                break;
            case 2:
                if (typeof args[0] === 'string') {
                    continuationToken = args[0];
                }
                else if (typeof args[0] === 'number') {
                    pageSize = args[0];
                }
                else {
                    throwInvalidParameter();
                }
                callback = args[1];
                break;
            case 3:
                pageSize = args[0];
                continuationToken = args[1];
                callback = args[2];
                break;
            default:
                throwInvalidParameter();
        }
        let options = {
            pageSize: pageSize,
            continuationToken: continuationToken,
            customHeaders: {},
            jar: false
        };
        var restClient = new RestClient(serverUrl, null);
        var remoteQuery = new RemoteQuery(restClient);
        this.getAccessToken((err, token) => {
            if (!err && token) {
                options.customHeaders = {
                    "Authorization": "Bearer " + token
                };
                remoteQuery.fetchMemberListWithPaging(conversationId, options, callback);
            }
            else {
                return callback(new Error("Failed to authorize request"), null);
            }
        });
    }
    startReplyChain(serverUrl, channelId, message, callback) {
        var options = { customHeaders: {}, jar: false };
        var restClient = new RestClient(serverUrl, null);
        var remoteQuery = new RemoteQuery(restClient);
        this.getAccessToken((err, token) => {
            if (!err && token) {
                options.customHeaders = {
                    'Authorization': 'Bearer ' + token
                };
                var iMessage = null;
                if (message.toMessage) {
                    iMessage = message.toMessage();
                }
                else if (message.address) {
                    iMessage = message;
                }
                else {
                    throw new Error("Message type is wrong. Need either IMessage or IIsMessage");
                }
                var innerCallback = function (err, result) {
                    if (!callback) {
                        return;
                    }
                    if (result && result.hasOwnProperty("id") && result.hasOwnProperty("activityId")) {
                        var messageAddress = iMessage.address;
                        var address = Object.assign(Object.assign({}, messageAddress), { channelId: 'msteams', conversation: { id: result.id }, id: result.activityId });
                        if (address.user) {
                            delete address.user;
                        }
                        return callback(null, address);
                    }
                    else {
                        let error = new Error("Failed to start reply chain: no conversation ID and activity ID returned.");
                        return callback(error, null);
                    }
                };
                remoteQuery.beginReplyChainInChannel(channelId, iMessage, options, innerCallback);
            }
            else {
                if (callback) {
                    return callback(new Error('Failed to authorize request'), null);
                }
            }
        });
    }
    send(messages, done) {
        return super.send(messages.filter((m) => m.type !== "endOfConversation"), done);
    }
    setAllowedTenants(tenants) {
        if (tenants != null) {
            this.allowedTenants = tenants;
        }
    }
    resetAllowedTenants() {
        this.allowedTenants = null;
    }
    onO365ConnectorCardAction(handler) {
        this.o365CardActionHandler = handler;
    }
    onSigninStateVerification(handler) {
        this.signinStateVerificationHandler = handler;
    }
    onQuery(commandId, handler) {
        if (!this.queryHandlers) {
            this.queryHandlers = {};
        }
        this.queryHandlers[commandId] = handler;
    }
    onQuerySettingsUrl(handler) {
        this.querySettingsUrlHandler = handler;
    }
    onSettingsUpdate(handler) {
        this.settingsUpdateHandler = handler;
    }
    onSelectItem(handler) {
        this.selectItemInvokeHandler = handler;
    }
    onFileConsentCardResponse(handler) {
        this.fileConsentCardResponseHandler = handler;
    }
    onTaskModuleFetch(handler) {
        this.taskModuleFetchHandler = handler;
    }
    onTaskModuleSubmit(handler) {
        this.taskModuleSubmitHandler = handler;
    }
    onComposeExtensionFetchTask(handler) {
        this.composeExtensionFetchTaskHandler = handler;
    }
    onComposeExtensionSubmitAction(handler) {
        this.composeExtensionSubmitActionHandler = handler;
    }
    onAppBasedLinkQuery(handler) {
        this.appBasedLinkHandler = handler;
    }
    onDispatchEvents(events, callback) {
        if (this.allowedTenants) {
            var filteredEvents = [];
            for (var event of events) {
                if (event.sourceEvent.tenant && this.allowedTenants.indexOf(event.sourceEvent.tenant.id) > -1) {
                    filteredEvents.push(event);
                }
            }
            this.dispatchEventOrQuery(filteredEvents, callback);
        }
        else {
            this.dispatchEventOrQuery(events, callback);
        }
    }
    dispatchEventOrQuery(events, callback) {
        var realEvents = [];
        for (var event of events) {
            if (event.type === 'invoke') {
                let invoke = event;
                let invokeHandler;
                switch (invoke.name) {
                    case TeamsChatConnector.queryInvokeName:
                        if (this.queryHandlers) {
                            invokeHandler = this.dispatchQuery.bind(this);
                        }
                        break;
                    case TeamsChatConnector.querySettingUrlInvokeName:
                        if (this.querySettingsUrlHandler) {
                            invokeHandler = this.querySettingsUrlHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.settingInvokeName:
                        if (this.settingsUpdateHandler) {
                            invokeHandler = this.settingsUpdateHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.selectItemInvokeName:
                        if (this.selectItemInvokeHandler) {
                            invokeHandler = this.selectItemInvokeHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.o365CardActionInvokeName:
                        if (this.o365CardActionHandler) {
                            invokeHandler = this.o365CardActionHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.signinStateVerificationInvokeName:
                        if (this.signinStateVerificationHandler) {
                            invokeHandler = this.signinStateVerificationHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.fileConsentInvokeName:
                        if (this.fileConsentCardResponseHandler) {
                            invokeHandler = this.fileConsentCardResponseHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.taskModuleInvokeNameOfFetch:
                        if (this.taskModuleFetchHandler) {
                            invokeHandler = this.taskModuleFetchHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.taskModuleInvokeNameOfSubmit:
                        if (this.taskModuleSubmitHandler) {
                            invokeHandler = this.taskModuleSubmitHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.composeExtensionInvokeNameofFetchTask:
                        if (this.composeExtensionFetchTaskHandler) {
                            invokeHandler = this.composeExtensionFetchTaskHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.composeExtensionInvokeNameofSubmitAction:
                        if (this.composeExtensionSubmitActionHandler) {
                            invokeHandler = this.composeExtensionSubmitActionHandler.bind(this);
                        }
                        break;
                    case TeamsChatConnector.appBasedLinkInvokeName:
                        if (this.appBasedLinkHandler) {
                            invokeHandler = this.appBasedLinkHandler.bind(this);
                        }
                        break;
                    default:
                        realEvents.push(event);
                        break;
                }
                if (invokeHandler) {
                    try {
                        invokeHandler(invoke, invoke.value, callback);
                    }
                    catch (e) {
                        return callback(e, null, 500);
                    }
                }
                else {
                    realEvents.push(event);
                }
            }
            else {
                realEvents.push(event);
            }
        }
        if (realEvents.length > 0) {
            super.onDispatchEvents(realEvents, callback);
        }
    }
    dispatchQuery(event, query, callback) {
        let handler = this.queryHandlers[query.commandId];
        if (handler) {
            handler(event, query, callback);
        }
        else {
            return callback(new Error("Query handler [" + query.commandId + "] not found."), null, 500);
        }
    }
}
exports.TeamsChatConnector = TeamsChatConnector;
TeamsChatConnector.o365CardActionInvokeName = 'actionableMessage/executeAction';
TeamsChatConnector.signinStateVerificationInvokeName = 'signin/verifyState';
TeamsChatConnector.queryInvokeName = 'composeExtension/query';
TeamsChatConnector.querySettingUrlInvokeName = 'composeExtension/querySettingUrl';
TeamsChatConnector.selectItemInvokeName = 'composeExtension/selectItem';
TeamsChatConnector.settingInvokeName = 'composeExtension/setting';
TeamsChatConnector.fileConsentInvokeName = 'fileConsent/invoke';
TeamsChatConnector.taskModuleInvokeNameOfFetch = task.taskModuleInvokeNameOfFetch;
TeamsChatConnector.taskModuleInvokeNameOfSubmit = task.taskModuleInvokeNameOfSubmit;
TeamsChatConnector.composeExtensionInvokeNameofFetchTask = 'composeExtension/fetchTask';
TeamsChatConnector.composeExtensionInvokeNameofSubmitAction = 'composeExtension/submitAction';
TeamsChatConnector.appBasedLinkInvokeName = 'composeExtension/queryLink';
