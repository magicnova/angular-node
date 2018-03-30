import { AuthService } from './auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
@Component({
	selector: 'app-signin',
	templateUrl: './templates/signin.component.html'
})
export class SignInComponent implements OnInit {
	signInForm: FormGroup;

	constructor(private authService: AuthService, private router: Router) {}

	onSubmit() {
		const user = new User(
			this.signInForm.value.email,
			this.signInForm.value.password
		);
		this.authService.singIn(user).subscribe(
			data => {
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId);
				this.router.navigateByUrl('/');
			},
			error => console.log(error)
		);
		this.signInForm.reset();
	}

	ngOnInit() {
		this.signInForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.email
			]),
			password: new FormControl(null, Validators.required)
		});
	}
}
