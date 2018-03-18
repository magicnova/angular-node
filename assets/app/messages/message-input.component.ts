import { Message } from './message.model';
import { Component } from '@angular/core';
import { MessageService } from './message.service';

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input-component.html',
	providers: [MessageService]
})
export class MessageInputComponent {
	constructor(private messageService: MessageService) {}

	onSave(contentValue: string) {
		const message = new Message(contentValue, 'asd');
		this.messageService.addMessage(message);
	}
}
