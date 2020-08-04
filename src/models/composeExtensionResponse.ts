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
import { IComposeExtensionResponse, ComposeExtensionAttachment } from  './index';

export class ComposeExtensionResponse {

	private data: IComposeExtensionResponse = {
		composeExtension: {
		  type: ""
		}
	}

	constructor(type: string) {
		this.data.composeExtension.type = type;
	}

	public static result(attachmentLayout: string = "list") {
		var obj = new ComposeExtensionResponse("result");
		obj.data.composeExtension.attachmentLayout = attachmentLayout;
		return obj;
	}

	public static auth() {
		return new ComposeExtensionResponse("auth");
	}

	public static config() {
		return new ComposeExtensionResponse("config");
	}

	public static message() {
		return new ComposeExtensionResponse("message");
	}

	public static messagePreview() {
		return new ComposeExtensionResponse("botMessagePreview");
	}

	public attachments(list: ComposeExtensionAttachment[]): this {
		this.data.composeExtension.attachments = [];
		if (list) {
			for (var i = 0; i < list.length; i++) {
				var attachment = list[i];
				this.data.composeExtension.attachments.push(attachment);
			}
		}
		return this;
	}

	public actions(list: builder.CardAction[]): this {
		this.data.composeExtension.suggestedActions = { actions: [] };
		if (list) {
			for (var i = 0; i < list.length; i++) {
				var action = list[i];
				this.data.composeExtension.suggestedActions.actions.push(action.toAction());
			}
		}
		return this;
	}

	public text(text: string): this {
		this.data.composeExtension.text = text;
		return this;
	}

	public preview(msg: builder.IIsMessage | builder.IMessage): this {
		this.data.composeExtension.activityPreview =
			(<builder.IIsMessage> msg).toMessage ? (<builder.IIsMessage> msg).toMessage() : (<builder.IMessage> msg);
		return this;
	}

	public toResponse(): IComposeExtensionResponse {
		return this.data;
	}
}