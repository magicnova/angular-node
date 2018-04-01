import { ErrorService } from './error.service';
import { Error } from './error.model';
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.css']
})
export class ErrorComponent implements OnInit {
	error: Error;
	display = 'none';

	constructor(private errorService: ErrorService) {}

	onErrorHandled() {
		this.display = 'none';
	}

	ngOnInit() {
		this.errorService.errorOcurred.subscribe((error: Error) => {
			this.error = error;
			this.display = 'block';
		});
	}
}
