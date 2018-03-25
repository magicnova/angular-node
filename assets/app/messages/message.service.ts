import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import {
	ADD_MESSAGE_URL,
	CONTENT_TYPE_JSON,
	GET_MESSAGES_URL,
	UPDATE_MESSAGE_URL,
	DELETE_MESSAGE_URL
} from './../app.backend';
import { Message } from './message.model';

@Injectable()
export class MessageService {
	private messages: Message[] = [];
	messageIsEdit = new EventEmitter<Message>();
	constructor(private httpService: Http) {}

	addMessage(message: Message) {
		const body = JSON.stringify(message);
		return this.httpService
			.post(ADD_MESSAGE_URL, body, { headers: CONTENT_TYPE_JSON })
			.map((response: Response) => {
				const result = response.json();
				const message = new Message(
					result.obj.content,
					'GP',
					result.obj._id,
					null
				);
				this.messages.push(message);
				return message;
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}

	getMessages() {
		return this.httpService
			.get(GET_MESSAGES_URL)
			.map((response: Response) => {
				const messages = response.json().obj;
				let transformedMessages: Message[] = [];

				for (let message of messages) {
					transformedMessages.push(
						new Message(message.content, 'GP', message._id, null)
					);
				}
				this.messages = transformedMessages;
				return transformedMessages;
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}

	editMessage(message: Message) {
		this.messageIsEdit.emit(message);
	}

	updateMessage(message: Message) {
		const body = JSON.stringify(message);
		return this.httpService
			.patch(UPDATE_MESSAGE_URL + message.messageId, body, {
				headers: CONTENT_TYPE_JSON
			})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);

		return this.httpService
			.delete(DELETE_MESSAGE_URL + message.messageId)
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}
}
