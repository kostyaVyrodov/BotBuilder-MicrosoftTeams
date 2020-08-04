//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Teams: https://dev.office.com/microsoft-teams
//
// Bot Builder Microsoft Teams SDK GitHub
// https://github.com/OfficeDev/BotBuilder-MicrosoftTeams
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//


import * as builder from 'botbuilder-v3';
import { ITaskModuleInvokeRequest } from './TaskModuleResponse';

/**
 * @class
 * Initializes a new instance of the ChannelInfo class.
 * @constructor
 * A channel info object which describes the channel.
 * @member {string} [name] Name of the channel
 *
 * @member {string} [id] Unique identifier representing a channel
 *
 *
 */
export interface ChannelInfo {
  name?: string;
  id?: string;
}

/**
 * @class
 * Initializes a new instance of the ChannelAccount class.
 * @constructor
 * A channel account object which describes the member.
 * @member {string} [id] Unique identifier representing a member
 *
 * @member {string} [objectId] User Id
 *
 * @member {string} [name] The display name for the member
 *
 * @member {string} [givenName] Name of the member
 *
 * @member {string} [surname] Name of the member
 *
 * @member {string} [userPrincipalName] Name of the member
 *
 * @member {string} [email] Email of the member
 *
 *
 */
export interface ChannelAccount {
  id: string;
  objectId: string;
  name: string;
  givenName: string;
  surname: string;
  email: string;
  userPrincipalName: string;
}

/**
 * @class
 * Initializes a new instance of the TeamsChannelAccountsResult class.
 * @constructor
 * The response from fetching conversation members
 * @member {string} [continuationToken] the continuationToken that determines if caller can making another call to fetch more members
 *
 * @member {ChannelAccount[]} [members] An array of members
 *
 */
export interface TeamsChannelAccountsResult {
  continuationToken: string;
  members: ChannelAccount[];
}

/**
 * @class
 * Initializes a new instance of the ConversationList class.
 * @constructor
 * List of channels under a team
 *
 * @member {array} [conversations]
 *
 */
export interface ConversationList {
  conversations?: ChannelInfo[];
}

/**
 * @class
 * Initializes a new instance of the TeamInfo class.
 * @constructor
 * Describes a team
 *
 * @member {string} [name] Name of team.
 *
 * @member {string} [id] Unique identifier representing a team
 *
 * @member {string} [aadGroupId] AAD group ID
 *
 */
export interface TeamInfo {
  name?: string;
  id?: string;
  aadGroupId?: string;
}

/**
 * @class
 * Initializes a new instance of the TenantInfo class.
 * @constructor
 * Describes a tenant
 *
 * @member {string} [id] Unique identifier representing a tenant
 *
 */
export interface TenantInfo {
  id?: string;
}

/**
 * @class
 * Initializes a new instance of the TeamsChannelData class.
 * @constructor
 * List of channels under a team
 *
 * @member {object} [channel]
 *
 * @member {string} [channel.id] Unique identifier representing a channel
 *
 * @member {string} [channel.name] Name of the channel
 *
 * @member {string} [eventType] Type of event.
 *
 * @member {object} [team]
 *
 * @member {string} [team.id] Unique identifier representing a team
 *
 * @member {string} [team.name] Name of team.
 *
 * @member {object} [tenant]
 *
 * @member {string} [tenant.id] Unique identifier representing a tenant
 *
 */
export interface TeamsChannelData {
  channel?: ChannelInfo;
  eventType?: string;
  team?: TeamInfo;
  tenant?: TenantInfo;
}

/**
 * @interface
 * Interface of O365 connector card
 *
 * @member {string} [title] Title of the card
 *
 * @member {string} [text] Text for the card
 *
 * @member {string} [summary] Summary for the card
 *
 * @member {string} [themeColor] Theme color for the card
 *
 * @member {array} [sections] Set of sections for the current card
 *
 * @member {array} [potentialAction] Set of actions for the current card
 *
 */
export interface IO365ConnectorCard {
  title?: string;
  text?: string;
  summary: string;
  themeColor?: string;
  sections?: IO365ConnectorCardSection[];
  potentialAction?: IO365ConnectorCardActionBase[];
}

/**
 * @enum
 * Activity Image types of O365 connector card
 *
 * @member {number} [Avatar] Default; activityImage will be cropped as a circle
 *
 * @member {number} [Article] activityImage will be displayed as a rectangle and retain its aspect ratio
 */
export enum O365ConnectorCardActivityImageTypes {
  Avatar,
  Article
}

/**
 * @interface
 * Interface of O365 connector card section
 *
 * @member {string} [title] Title of the section
 *
 * @member {string} [text] Text for the section
 *
 * @member {string} [activityTitle] Activity title
 *
 * @member {string} [activitySubtitle] Activity subtitle
 *
 * @member {string} [activityText] Activity text
 *
 * @member {string} [activityImage] Activity image
 *
 * @member {string} [activityImageType] Activity image type. Default value would be avatar if not specified.
 *
 * @member {boolean} [markdown] Use markdown for all text contents. Default value is true.
 *
 * @member {array} [facts] Set of facts for the current section
 *
 * @member {array} [images] Set of images for the current section
 *
 * @member {array} [potentialAction] Set of actions for the current section
 *
 */
export interface IO365ConnectorCardSection {
  title?: string;
  text?: string;
  activityTitle?: string;
  activitySubtitle?: string;
  activityText?: string;
  activityImage?: string;
  activityImageType?: string;
  markdown?: boolean;
  facts: IO365ConnectorCardFact[];
  images: IO365ConnectorCardImage[];
  potentialAction?: IO365ConnectorCardActionBase[];
}

export interface IIsO365ConnectorCardSection {
  toSection(): IO365ConnectorCardSection;
}

/**
 * @interface
 * Interface of O365 connector card fact
 *
 * @member {string} [name] Display name of the fact
 *
 * @member {string} [value] Display value for the fact
 *
 */
export interface IO365ConnectorCardFact {
  name: string;
  value: string;
}

export interface IIsO365ConnectorCardFact {
  toFact(): IO365ConnectorCardFact;
}

/**
 * @interface
 * Interface of O365 connector card image
 *
 * @member {string} [image] URL for the image
 *
 * @member {string} [title] Alternative text for the image
 *
 */
export interface IO365ConnectorCardImage {
  image: string;
  title?: string;
}

export interface IIsO365ConnectorCardImage {
  toImage(): IO365ConnectorCardImage;
}

/**
 * @interface
 * Base interface of O365 connector card action.
 *
 * @member {string} [type] Type of the action
 *
 * @member {string} [name] Name of the action that will be used as button title
 *
 * @member {string} [id] Action Id
 *
 */
export interface IO365ConnectorCardActionBase {
  type: string;
  name: string;
  id?: string;
}

export interface IIsO365ConnectorCardActionBase {
  toAction(): IO365ConnectorCardActionBase;
}

/**
 * @interface
 * Interface of O365 connector card ViewAction action
 *
 * @member {array} [target] Target urls, only the first url effective for card button
 *
 */
export interface IO365ConnectorCardViewAction extends IO365ConnectorCardActionBase {
  target: string[];
}

/**
 * @type
 * Type of literal strings used for OpenUri target (IO365ConnectorCardOpenUriTarget) operating systems (os).
 *
 */
export type O365ConnectorCardOpenUriOS = 'default' | 'iOS' | 'android' | 'windows';

/**
 * @interface
 * Interface of O365 connector card OpenUri target
 *
 * @member {O365ConnectorCardOpenUriOS} [os] Target operating system
 *
 * @member {string} [uri] Target url
 *
 */
export interface IO365ConnectorCardOpenUriTarget {
  os: O365ConnectorCardOpenUriOS;
  uri: string;
}

/**
 * @interface
 * Interface of O365 connector card OpenUri action
 *
 * @member {O365ConnectorCardOpenUriOS} [os] Target operating system
 *
 * @member {string} [uri] Target url
 *
 */
export interface IO365ConnectorCardOpenUri extends IO365ConnectorCardActionBase {
  targets: IO365ConnectorCardOpenUriTarget[];
}

/**
 * @interface
 * Interface of O365 connector card HttpPOST action
 *
 * @member {string} [body] Content to be posted back to bots via invoke.
 *
 */
export interface IO365ConnectorCardHttpPOST extends IO365ConnectorCardActionBase {
  body?: string;
}

/**
 * @interface
 * Interface of O365 connector card ActionCard action
 *
 * @member {array} [inputs] Set of inputs contained in this ActionCard whose each item can be in any subtype of IO365ConnectorCardInputBase
 *
 * @member {array} [actions] Set of actions contained in this ActionCard whose each item can be in any subtype of IO365ConnectorCardInputBase except IO365ConnectorCardActionCard, as nested ActionCard is forbidden.
 *
 */
export interface IO365ConnectorCardActionCard extends IO365ConnectorCardActionBase {
  inputs: IO365ConnectorCardInputBase[];
  actions: IO365ConnectorCardActionBase[];
}

/**
 * @interface
 * Base interface of O365 connector card input for ActionCard action
 *
 * @member {string} [type] Input type name
 *
 * @member {string} [id] Input Id. It must be unique per entire O365 connector card.
 *
 * @member {boolean} [isRequired] Define if this input is a required field. Default value is false.
 *
 * @member {string} [title] Input title that will be shown as the placeholder
 *
 * @member {string} [value] Default value for this input field
 */
export interface IO365ConnectorCardInputBase {
  type: string;
  id: string;
  isRequired?: boolean;
  title: string;
  value: string;
}

export interface IIsO365ConnectorCardInputBase {
  toInput(): IO365ConnectorCardInputBase;
}

/**
 * @interface
 * Interface of O365 connector card text input
 *
 * @member {boolean} [isMultiline] Define if text input is allowed for multiple lines. Default value is false.
 *
 * @member {number} [maxLength] Maximum length of text input. Default value is unlimited.
 *
 */
export interface IO365ConnectorCardTextInput extends IO365ConnectorCardInputBase{
  isMultiline?: boolean;
  maxLength?: number;
}

/**
 * @interface
 * Interface of O365 connector card date input
 *
 * @member {boolean} [includeTime] Include time input field. Default value  is false (date only).
 *
 */
export interface IO365ConnectorCardDateInput extends IO365ConnectorCardInputBase{
  includeTime?: boolean;
}

/**
 * @interface
 * Interface of O365 connector card multiple choice input
 *
 * @member {array} [choices] Set of choices whose each item can be in any subtype of IO365ConnectorCardMultichoiceInputChoice.
 *
 * @member {O365ConnectorCardMultichoiceInputStyle} [style] Choice item rendering style. Could be 'compact' (default) or 'expanded'.
 *
 * @member {boolean} [isMultiSelect] Define if this input field allows multiple selections. Default value is false.
 *
 */
export interface IO365ConnectorCardMultichoiceInput extends IO365ConnectorCardInputBase{
  choices: IO365ConnectorCardMultichoiceInputChoice[];
  style?: O365ConnectorCardMultichoiceInputStyle;
  isMultiSelect?: boolean;
}

/**
 * @type
 * Type of literal strings used for multi-choice input (IO365ConnectorCardMultichoiceInput) rendering style.
 *
 */
export type O365ConnectorCardMultichoiceInputStyle = 'compact' | 'expanded';

/**
 * @interface
 * Interface of O365 connector card multiple choice input item
 *
 * @member {string} [display] The text rendered on ActionCard.
 *
 * @member {string} [value] The value received as results.
 *
 */
export interface IO365ConnectorCardMultichoiceInputChoice {
  display: string;
  value: string;
}

export interface IIsO365ConnectorCardMultichoiceInputChoice {
  toChoice(): IO365ConnectorCardMultichoiceInputChoice;
}

/**
 * @interface
 * Interface of O365 connector card HttpPOST invoke query
 *
 * @member {string} [body] The results of body string defined in IO365ConnectorCardHttpPOST with substituted input values
 *
 * @member {string} [actionId] Action Id associated with the HttpPOST action button triggered, defined in IO365ConnectorCardActionBase.
 *
 */
export interface IO365ConnectorCardActionQuery {
  body: string;
  actionId: string;
}

/**
 * @interface
 * Interface of signin auth state verification query
 *
 * @member {string} [state] The state string originally received when the signin web flow is finished with a state posted back to client via tab SDK microsoftTeams.authentication.notifySuccess(state)
 *
 */
export interface ISigninStateVerificationQuery {
  state: string;
}

/**
 * @class
 * Initializes a new instance of the ComposeExtensionQueryOptions class.
 * @constructor
 * Compose extensions query options
 *
 * @member {number} [skip] Number of entities to skip
 *
 * @member {number} [count] Number of entities to fetch
 *
 */
export interface ComposeExtensionQueryOptions {
  skip?: number;
  count?: number;
}

/**
 * @class
 * Initializes a new instance of the ComposeExtensionParameter class.
 * @constructor
 * Compose extension query parameters
 *
 * @member {string} [name] Name of the parameter
 *
 * @member {object} [value] Value of the parameter
 *
 */
export interface ComposeExtensionParameter {
  name?: string;
  value?: any;
}

/**
 * @class
 * Initializes a new instance of the ComposeExtensionQuery class.
 * @constructor
 * Compose extension query
 *
 * @member {string} [commandId] Id of the command assigned by Bot
 *
 * @member {array} [parameters] Parameters for the query
 *
 * @member {object} [queryOptions]
 *
 * @member {number} [queryOptions.skip] Number of entities to skip
 *
 * @member {number} [queryOptions.count] Number of entities to fetch
 *
 * @member {string} [state] state parameter used by the bot to send back at the end of authentication/configuration flow
 *
 */
export interface ComposeExtensionQuery {
  commandId?: string;
  parameters?: ComposeExtensionParameter[];
  queryOptions?: ComposeExtensionQueryOptions;
  state?: string;
}

/**
 * @class
 * Initializes a new instance of the ComposeExtensionAttachment class.
 * @constructor
 * Compose extension attachment.
 *
 * @member {object} [preview]
 *
 * @member {string} [preview.contentType] mimetype/Contenttype for the file
 *
 * @member {string} [preview.contentUrl] Content Url
 *
 * @member {object} [preview.content] Embedded content
 *
 * @member {string} [preview.name] (OPTIONAL) The name of the attachment
 *
 * @member {string} [preview.thumbnailUrl] (OPTIONAL) Thumbnail associated with
 * attachment
 *
 */
export interface ComposeExtensionAttachment extends builder.IAttachment {
  preview?: builder.IAttachment;
}

/**
 * @class
 * Initializes a new instance of the ComposeExtensionResult class.
 * @constructor
 * Compose extension result
 *
 * @member {string} [attachmentLayout] Hint for how to deal with multiple
 * attachments.
 *
 * @member {string} [type] The type of the result
 *
 * @member {array} [attachments] Attachments
 *
 * @member {array} [suggestedActions] suggestedActions
 *
 * @member {string} [text] text
 * 
 * @member {builder.IMessage} [activityPreview] activity (message) to preview 
 */

export interface ComposeExtensionResult {
  attachmentLayout?: string;
  type?: string;
  attachments?: ComposeExtensionAttachment[];
  suggestedActions?: builder.ISuggestedActions;
  text?: string;
  activityPreview?: builder.IMessage;
}


/**
 * @class
 * Initializes a new instance of the ComposeExtensionResponse class.
 * @constructor
 * Compose extension response
 *
 * @member {object} [composeExtension]
 *
 * @member {string} [composeExtension.attachmentLayout] Hint for how to deal
 * with multiple attachments.
 *
 * @member {string} [composeExtension.type] The type of the result
 *
 * @member {array} [composeExtension.attachments] Attachments
 *
 */
export interface IComposeExtensionResponse {
  composeExtension?: ComposeExtensionResult;
}

export interface IMessageActionsPayload {
  id: string;
  replyToId: string;
  messageType: 'message';
  createdDateTime: string;
  lastModifiedDateTime: string;
  deleted: boolean;
  subject: string;
  summary: string;
  importance: 'normal' | 'high' | 'urgent';
  locale: string;
  from: IMessageActionsPayloadFrom;
  body: {
    contentType: 'html' | 'text';
    content: string;
  };
  attachmentLayout?: string;
  attachments: IMessageActionsPayloadAttachment[];
  mentions: IMessageActionsPayloadMention[];
  reactions: IMessageActionsPayloadReaction[];
}

export interface IMessageActionsPayloadFrom {
  device: null;
  user: IMessageActionsPayloadUser;
  application: IMessageActionsPayloadApp;
  conversation: IMessageActionsPayloadConversation;
}

export interface IMessageActionsPayloadUser {
  userIdentityType: 'aadUser' | 'onPremiseAadUser' | 'anonymousGuest' | 'federatedUser';
  id: string;
  displayName: string;
}

export interface IMessageActionsPayloadApp {
  applicationIdentityType:  'aadApplication' | 'bot' | 'tenantBot' | 'office365Connector' | 'webhook';
  id: string;
  displayName: string;
}

export interface IMessageActionsPayloadConversation {
  conversationIdentityType: 'team' | 'channel';
  id: string;
  displayName: string;
}

export interface IMessageActionsPayloadMention {
  id: number;
  mentionText: string;
  mentioned: IMessageActionsPayloadFrom;
}

export interface IMessageActionsPayloadReaction {
  reactionType: 'like' | 'heart' | 'laugh' | 'surprised' | 'sad' | 'angry';
  createdDateTime: string;
  user: IMessageActionsPayloadFrom;
}

export interface IMessageActionsPayloadAttachment {
  id: string;
  contentType: string;
  contentUrl?: string;
  content?: any;
  name?: string;
  thumbnailUrl?: string;
}

export interface IComposeExtensionActionCommandRequest extends ITaskModuleInvokeRequest {
  commandId?: string;
  commandContext?: 'message' | 'compose' | 'commandbox';
  botMessagePreviewAction?: 'edit' | 'send';
  botActivityPreview?: builder.IMessage;
  messageActionsPayload?: IMessageActionsPayload;
}

export class ComposeExtensionResponse {

  constructor(type: string);

  result(attachmentLayout: string):  ComposeExtensionResponse;

  auth(): ComposeExtensionResponse;

  config(): ComposeExtensionResponse;

  message(): ComposeExtensionResponse;

  attachments(list: ComposeExtensionAttachment[]): ComposeExtensionResponse;

  actions(list: builder.CardAction[]): ComposeExtensionResponse;

  toResponse(): IComposeExtensionResponse
}

export declare class ChannelInfo {
  constructor(name: string, id: string);
}

export declare class TeamInfo {
  constructor(name: string, id: string);
}

export declare class TenantInfo {
  constructor(id: string);
}
