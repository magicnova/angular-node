import { AuthService } from './auth.service';
import { Component } from '@angular/core';
@Component({
	selector: 'app-authentication',
	templateUrl: './templates/authentication.component.html'
})
export class AuthenticationComponent {
	constructor(private authService: AuthService) {}

	isLoggendIn() {
		return this.authService.isLoggedIn();
	}
}
