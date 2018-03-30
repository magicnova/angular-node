import { User } from './user.model';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'app-signup',
	templateUrl: './templates/signup.component.html'
})
export class SignUpComponent implements OnInit {
	signUpForm: FormGroup;

	constructor(private authService: AuthService) {}

	onSubmit() {
		const user = new User(
			this.signUpForm.value.email,
			this.signUpForm.value.password,
			this.signUpForm.value.firstName,
			this.signUpForm.value.lastName
		);
		this.authService
			.singUp(user)
			.subscribe(
				result => console.log(result),
				error => console.log(error)
			);

		this.signUpForm.reset();
	}

	ngOnInit() {
		this.signUpForm = new FormGroup({
			firstName: new FormControl(null, Validators.required),
			lastName: new FormControl(null, Validators.required),
			email: new FormControl(null, [
				Validators.required,
				Validators.email
			]),
			password: new FormControl(null, Validators.required)
		});
	}
}
