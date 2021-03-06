"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder-v3");
class AdaptiveCardBotBuilderAction {
    constructor(sessionOrWrapAction) {
        this.sessionOrWrapAction = sessionOrWrapAction;
        if (sessionOrWrapAction instanceof builder.CardAction) {
            this.adaptorObj = sessionOrWrapAction;
        }
        else {
            this.adaptorObj = new builder.CardAction(sessionOrWrapAction);
        }
    }
    static convertFromBotBuilderCardAction(btn) {
        let adapterBtn = {
            id: undefined,
            type: 'Action.Submit',
            title: btn.title,
            data: {},
        };
        delete btn.title;
        adapterBtn.data[AdaptiveCardBotBuilderAction.TeamsActionWrapperName] = btn;
        return adapterBtn;
    }
    type(t) {
        this.adaptorObj.type(t);
        return this;
    }
    title(text, ...args) {
        this.adaptorObj.title(text, ...args);
        return this;
    }
    value(v) {
        this.adaptorObj.value(v);
        return this;
    }
    text(text, ...args) {
        this.adaptorObj.text(text, ...args);
        return this;
    }
    displayText(text, ...args) {
        this.adaptorObj.displayText(text, ...args);
        return this;
    }
    toAction() {
        return this.adaptorObj.toAction();
    }
    toAdaptiveCardAction() {
        let btn = this.toAction();
        let adapterBtn = AdaptiveCardBotBuilderAction.convertFromBotBuilderCardAction(btn);
        return adapterBtn;
    }
}
exports.AdaptiveCardBotBuilderAction = AdaptiveCardBotBuilderAction;
AdaptiveCardBotBuilderAction.TeamsActionWrapperName = 'msteams';
class AdaptiveCard {
    constructor(session) {
        this.session = session;
        this.data = {
            type: 'AdaptiveCard',
            version: '1.0'
        };
    }
    get type() {
        return this.data.type;
    }
    version(value) {
        this.data.version = value;
        return this;
    }
    backgroundImage(value) {
        this.data.backgroundImage = value;
        return this;
    }
    body(value) {
        this.data.body = value;
        return this;
    }
    speak(value) {
        this.data.speak = value;
        return this;
    }
    fallbackText(value) {
        this.data.fallbackText = value;
        return this;
    }
    lang(value) {
        this.data.lang = value;
        return this;
    }
    actions(list) {
        this.data.actions = [];
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var action = list[i];
                let isBotBuilderAction = (list instanceof builder.CardAction) || action.toAction;
                if (isBotBuilderAction) {
                    let btn = action.toAction ? action.toAction() : action;
                    let adapterBtn = AdaptiveCardBotBuilderAction.convertFromBotBuilderCardAction(btn);
                    this.data.actions.push(adapterBtn);
                }
                else {
                    if (action.toAdaptiveCardAction) {
                        this.data.actions.push(action.toAdaptiveCardAction());
                    }
                    else {
                        this.data.actions.push(action);
                    }
                }
            }
        }
        return this;
    }
    toAdaptiveCard() {
        return this.data;
    }
    toAttachment() {
        let cardAttachment = {
            contentType: AdaptiveCard.contentType,
            content: this.toAdaptiveCard()
        };
        return cardAttachment;
    }
}
exports.AdaptiveCard = AdaptiveCard;
AdaptiveCard.contentType = 'application/vnd.microsoft.card.adaptive';
