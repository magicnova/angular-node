import { ErrorService } from './../errors/error.service';
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
	constructor(
		private httpService: Http,
		private errorService: ErrorService
	) {}

	addMessage(message: Message) {
		const body = JSON.stringify(message);
		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';
		return this.httpService
			.post(ADD_MESSAGE_URL + token, body, { headers: CONTENT_TYPE_JSON })
			.map((response: Response) => {
				const result = response.json();
				console.log(result);
				const message = new Message(
					result.obj.content,
					result.obj.user.firstName,
					result.obj._id,
					result.obj.user._id
				);
				this.messages.push(message);
				return message;
			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	getMessages() {
		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';
		return this.httpService
			.get(GET_MESSAGES_URL)
			.map((response: Response) => {
				const messages = response.json().obj;
				let transformedMessages: Message[] = [];
				for (let message of messages) {
					transformedMessages.push(
						new Message(
							message.content,
							message.user.firstName,
							message._id,
							message.user._id
						)
					);
				}
				this.messages = transformedMessages;
				return transformedMessages;
			})
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	editMessage(message: Message) {
		this.messageIsEdit.emit(message);
	}

	updateMessage(message: Message) {
		const body = JSON.stringify(message);
		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';
		return this.httpService
			.patch(UPDATE_MESSAGE_URL + message.messageId + token, body, {
				headers: CONTENT_TYPE_JSON
			})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);
		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';
		return this.httpService
			.delete(DELETE_MESSAGE_URL + message.messageId + token)
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}
}
