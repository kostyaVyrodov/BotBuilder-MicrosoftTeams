"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder-v3");
const AdaptiveCard_1 = require("./AdaptiveCard");
class TaskModuleCardAction {
    constructor(session) {
        this.session = session;
        this.adaptorObj = new builder.CardAction(session);
        this.adaptorObj.type('invoke');
    }
    title(text, ...args) {
        this.adaptorObj.title(text, ...args);
        return this;
    }
    value(v) {
        this.adaptorObj.value(v);
        return this;
    }
    toAction() {
        let json = this.adaptorObj.toAction();
        let valJson = (typeof json.value === 'string') ? JSON.parse(json.value) : json.value;
        valJson.type = 'task/fetch';
        json.value = JSON.stringify(valJson);
        return json;
    }
    toAdaptiveCardAction() {
        let btn = this.toAction();
        let adapterBtn = AdaptiveCard_1.AdaptiveCardBotBuilderAction.convertFromBotBuilderCardAction(btn);
        return adapterBtn;
    }
}
exports.TaskModuleCardAction = TaskModuleCardAction;
