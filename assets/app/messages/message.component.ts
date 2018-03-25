import { MessageService } from './message.service';
import { Component, Input } from '@angular/core';
import { Message } from './message.model';

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
	styles: [
		`
        .author{
            display:inline-block;
            font-style:italic;
            font-size:12px;
            width:80%;
        }
        .config{
            display:inline-block;
            text-align:rigth;
            font-size:12px;
            width:19%;
        }
    `
	]
})
export class MessageComponent {
	@Input('inputMessage') message: Message;

	constructor(private messageService: MessageService) {}

	onEdit() {
		this.messageService.editMessage(this.message);
	}

	onDelete() {
		this.messageService
			.deleteMessage(this.message)
			.subscribe(data => console.log(data));
	}
}
