"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder-v3");
const sprintf = require("sprintf-js");
class O365ConnectorCard {
    constructor(session) {
        this.session = session;
        this.data = {
            contentType: 'application/vnd.microsoft.teams.card.o365connector',
            content: {}
        };
    }
    title(text, ...args) {
        if (text) {
            this.data.content.title = fmtText(this.session, text, args);
        }
        else {
            delete this.data.content.title;
        }
        return this;
    }
    text(text, ...args) {
        if (text) {
            this.data.content.text = fmtText(this.session, text, args);
        }
        else {
            delete this.data.content.text;
        }
        return this;
    }
    summary(text, ...args) {
        this.data.content.summary = text ? fmtText(this.session, text, args) : '';
        return this;
    }
    themeColor(color) {
        if (color) {
            this.data.content.themeColor = color;
        }
        else {
            delete this.data.content.themeColor;
        }
        return this;
    }
    sections(list) {
        this.data.content.sections = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let section = list[i];
                this.data.content.sections.push(section.toSection ? section.toSection() : section);
            }
        }
        return this;
    }
    potentialAction(list) {
        this.data.content.potentialAction = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let action = list[i];
                let obj = action.toAction ?
                    action.toAction() : action;
                this.data.content.potentialAction.push(o365ActionToPayload(obj));
            }
        }
        return this;
    }
    toAttachment() {
        return this.data;
    }
}
exports.O365ConnectorCard = O365ConnectorCard;
var O365ConnectorCardActivityImageTypes;
(function (O365ConnectorCardActivityImageTypes) {
    O365ConnectorCardActivityImageTypes[O365ConnectorCardActivityImageTypes["Avatar"] = 0] = "Avatar";
    O365ConnectorCardActivityImageTypes[O365ConnectorCardActivityImageTypes["Article"] = 1] = "Article";
})(O365ConnectorCardActivityImageTypes = exports.O365ConnectorCardActivityImageTypes || (exports.O365ConnectorCardActivityImageTypes = {}));
class O365ConnectorCardSection {
    constructor(session) {
        this.session = session;
        this.data = {};
    }
    title(text, ...args) {
        if (text) {
            this.data.title = fmtText(this.session, text, args);
        }
        else {
            delete this.data.title;
        }
        return this;
    }
    text(text, ...args) {
        if (text) {
            this.data.text = fmtText(this.session, text, args);
        }
        else {
            delete this.data.text;
        }
        return this;
    }
    activityTitle(text, ...args) {
        if (text) {
            this.data.activityTitle = fmtText(this.session, text, args);
        }
        else {
            delete this.data.activityTitle;
        }
        return this;
    }
    activitySubtitle(text, ...args) {
        if (text) {
            this.data.activitySubtitle = fmtText(this.session, text, args);
        }
        else {
            delete this.data.activitySubtitle;
        }
        return this;
    }
    activityText(text, ...args) {
        if (text) {
            this.data.activityText = fmtText(this.session, text, args);
        }
        else {
            delete this.data.activityText;
        }
        return this;
    }
    activityImage(imageUrl) {
        if (imageUrl) {
            this.data.activityImage = imageUrl;
            if (!this.data.activityImageType) {
                this.data.activityImageType = 'avatar';
            }
        }
        else {
            delete this.data.activityImage;
            delete this.data.activityImageType;
        }
        return this;
    }
    activityImageType(imageType) {
        if (imageType === O365ConnectorCardActivityImageTypes.Article) {
            this.data.activityImageType = 'article';
        }
        else {
            this.data.activityImageType = 'avatar';
        }
        return this;
    }
    markdown(flag) {
        this.data.markdown = !!flag;
        return this;
    }
    facts(list) {
        this.data.facts = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let fact = list[i];
                this.data.facts.push(fact.toFact ? fact.toFact() : fact);
            }
        }
        return this;
    }
    images(list) {
        this.data.images = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let image = list[i];
                this.data.images.push(image.toImage ? image.toImage() : image);
            }
        }
        return this;
    }
    potentialAction(list) {
        this.data.potentialAction = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let action = list[i];
                let obj = action.toAction ?
                    action.toAction() : action;
                this.data.potentialAction.push(o365ActionToPayload(obj));
            }
        }
        return this;
    }
    toSection() {
        return this.data;
    }
}
exports.O365ConnectorCardSection = O365ConnectorCardSection;
class O365ConnectorCardFact {
    constructor(session) {
        this.session = session;
        this.data = { name: '' };
    }
    name(text, ...args) {
        if (text) {
            this.data.name = fmtText(this.session, text, args);
        }
        else {
            delete this.data.name;
        }
        return this;
    }
    value(text, ...args) {
        if (text) {
            this.data.value = fmtText(this.session, text, args);
        }
        else {
            delete this.data.value;
        }
        return this;
    }
    toFact() {
        return this.data;
    }
}
exports.O365ConnectorCardFact = O365ConnectorCardFact;
class O365ConnectorCardImage {
    constructor(session) {
        this.session = session;
        this.data = {};
    }
    image(url) {
        if (url) {
            this.data.image = url;
        }
        return this;
    }
    title(text, ...args) {
        if (text) {
            this.data.title = fmtText(this.session, text, args);
        }
        else {
            delete this.data.title;
        }
        return this;
    }
    toImage() {
        return this.data;
    }
}
exports.O365ConnectorCardImage = O365ConnectorCardImage;
class O365ConnectorCardActionBase {
    constructor(session) {
        this.session = session;
        this.data = {};
    }
    name(text, ...args) {
        if (text) {
            this.data.name = fmtText(this.session, text, args);
        }
        else {
            delete this.data.name;
        }
        return this;
    }
    id(actionId) {
        if (actionId) {
            this.data.id = actionId;
        }
        else {
            delete this.data.id;
        }
        return this;
    }
    toAction() {
        this.data.type = this.type;
        return this.data;
    }
}
exports.O365ConnectorCardActionBase = O365ConnectorCardActionBase;
class O365ConnectorCardViewAction extends O365ConnectorCardActionBase {
    constructor(session) {
        super(session);
        this.session = session;
    }
    target(targetUrl) {
        this.data.target = targetUrl ? [targetUrl] : [];
        return this;
    }
    get type() {
        return 'ViewAction';
    }
}
exports.O365ConnectorCardViewAction = O365ConnectorCardViewAction;
class O365ConnectorCardOpenUri extends O365ConnectorCardActionBase {
    constructor(session) {
        super(session);
        this.session = session;
        this.targetsData = {};
    }
    targets(platformUrlMap) {
        if (platformUrlMap) {
            this.targetsData = platformUrlMap;
            this.update();
        }
        return this;
    }
    default(targetUrl) {
        if (targetUrl) {
            this.targetsData.default = targetUrl;
        }
        else {
            delete this.targetsData.default;
        }
        this.update();
        return this;
    }
    iOS(targetUrl) {
        if (targetUrl) {
            this.targetsData.iOS = targetUrl;
        }
        else {
            delete this.targetsData.iOS;
        }
        this.update();
        return this;
    }
    android(targetUrl) {
        if (targetUrl) {
            this.targetsData.android = targetUrl;
        }
        else {
            delete this.targetsData.android;
        }
        this.update();
        return this;
    }
    windowsPhone(targetUrl) {
        if (targetUrl) {
            this.targetsData.windows = targetUrl;
        }
        else {
            delete this.targetsData.windows;
        }
        this.update();
        return this;
    }
    update() {
        let data = [];
        for (let key in this.targetsData) {
            let val = this.targetsData[key];
            if (val) {
                data.push({
                    os: key,
                    uri: val
                });
            }
        }
        this.data.targets = data;
    }
    get type() {
        return 'OpenUri';
    }
}
exports.O365ConnectorCardOpenUri = O365ConnectorCardOpenUri;
class O365ConnectorCardHttpPOST extends O365ConnectorCardActionBase {
    constructor(session) {
        super(session);
        this.session = session;
    }
    body(text) {
        if (text) {
            this.data.body = text;
        }
        else {
            delete this.data.body;
        }
        return this;
    }
    get type() {
        return 'HttpPOST';
    }
}
exports.O365ConnectorCardHttpPOST = O365ConnectorCardHttpPOST;
class O365ConnectorCardActionCard extends O365ConnectorCardActionBase {
    constructor(session) {
        super(session);
        this.session = session;
    }
    actions(list) {
        let data = this.data;
        data.actions = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let action = list[i];
                let obj = action.toAction ?
                    action.toAction() : action;
                data.actions.push(o365ActionToPayload(obj));
            }
        }
        return this;
    }
    inputs(list) {
        let data = this.data;
        data.inputs = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let input = list[i];
                let obj = input.toInput ?
                    input.toInput() : input;
                data.inputs.push(o365InputToPayload(obj));
            }
        }
        return this;
    }
    get type() {
        return 'ActionCard';
    }
}
exports.O365ConnectorCardActionCard = O365ConnectorCardActionCard;
class O365ConnectorCardInputBase {
    constructor(session) {
        this.session = session;
        this.data = {};
    }
    id(inputId) {
        if (inputId) {
            this.data.id = inputId;
        }
        else {
            delete this.data.id;
        }
        return this;
    }
    isRequired(flag) {
        this.data.isRequired = !!flag;
        return this;
    }
    title(text, ...args) {
        if (text) {
            this.data.title = fmtText(this.session, text, args);
        }
        else {
            delete this.data.title;
        }
        return this;
    }
    value(text) {
        if (text) {
            this.data.value = text;
        }
        else {
            delete this.data.value;
        }
        return this;
    }
    toInput() {
        this.data.type = this.type;
        return this.data;
    }
}
exports.O365ConnectorCardInputBase = O365ConnectorCardInputBase;
class O365ConnectorCardTextInput extends O365ConnectorCardInputBase {
    constructor(session) {
        super(session);
        this.session = session;
    }
    isMultiline(flag) {
        this.data.isMultiline = !!flag;
        return this;
    }
    maxLength(len) {
        if (len && len > 0) {
            this.data.maxLength = len;
        }
        else {
            delete this.data.maxLength;
        }
        return this;
    }
    get type() {
        return 'textInput';
    }
}
exports.O365ConnectorCardTextInput = O365ConnectorCardTextInput;
class O365ConnectorCardDateInput extends O365ConnectorCardInputBase {
    constructor(session) {
        super(session);
        this.session = session;
    }
    includeTime(flag) {
        this.data.includeTime = !!flag;
        return this;
    }
    get type() {
        return 'dateInput';
    }
}
exports.O365ConnectorCardDateInput = O365ConnectorCardDateInput;
class O365ConnectorCardMultichoiceInput extends O365ConnectorCardInputBase {
    constructor(session) {
        super(session);
        this.session = session;
    }
    isMultiSelect(flag) {
        this.data.isMultiSelect = !!flag;
        return this;
    }
    style(s) {
        if (s) {
            this.data.style = s;
        }
        else {
            delete this.data.style;
        }
        return this;
    }
    compactStyle() {
        this.data.style = 'compact';
        return this;
    }
    expandedStyle() {
        this.data.style = 'expanded';
        return this;
    }
    choices(list) {
        let choicesData = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (item.toChoice) {
                    choicesData.push(item.toChoice());
                }
                else {
                    choicesData.push(item);
                }
            }
        }
        this.data.choices = choicesData;
        return this;
    }
    get type() {
        return 'multichoiceInput';
    }
}
exports.O365ConnectorCardMultichoiceInput = O365ConnectorCardMultichoiceInput;
class O365ConnectorCardMultichoiceInputChoice {
    constructor(session) {
        this.session = session;
        this.data = {};
    }
    display(text, ...args) {
        if (text) {
            this.data.display = fmtText(this.session, text, args);
        }
        else {
            delete this.data.display;
        }
        return this;
    }
    value(text) {
        if (text) {
            this.data.value = text;
        }
        else {
            delete this.data.value;
        }
        return this;
    }
    toChoice() {
        return this.data;
    }
}
exports.O365ConnectorCardMultichoiceInputChoice = O365ConnectorCardMultichoiceInputChoice;
function fmtText(session, prompts, args) {
    var fmt = builder.Message.randomPrompt(prompts);
    if (session) {
        fmt = session.gettext(fmt);
    }
    return args && args.length > 0 ? sprintf.vsprintf(fmt, args) : fmt;
}
exports.fmtText = fmtText;
function o365ActionToPayload(obj) {
    if (obj.type) {
        obj['@type'] = obj.type;
        delete obj.type;
    }
    if (obj.id) {
        obj['@id'] = obj.id;
        delete obj.id;
    }
    return obj;
}
exports.o365ActionToPayload = o365ActionToPayload;
function o365InputToPayload(obj) {
    if (obj.type) {
        obj['@type'] = obj.type;
        delete obj.type;
    }
    return obj;
}
exports.o365InputToPayload = o365InputToPayload;
