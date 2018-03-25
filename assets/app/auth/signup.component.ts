import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'app-signup',
	templateUrl: './templates/signup.component.html'
})
export class SignUpComponent implements OnInit {
	signUpForm: FormGroup;

	onSubmit() {
		console.log(this.signUpForm);
	}

	ngOnInit() {
		this.signUpForm = new FormGroup({
			firstName: new FormControl(null, Validators.required),
			lastName: new FormControl(null, Validators.required),
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, Validators.required)
		});
	}
}
