import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'app-signin',
	templateUrl: './templates/signin.component.html'
})
export class SignInComponent implements OnInit {
	signInForm: FormGroup;

	onSubmit() {
		console.log(this.signInForm);
	}

	ngOnInit() {
		this.signInForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, Validators.required)
		});
	}
}
