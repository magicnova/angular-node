import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
@Component({
	selector: 'app-logout',
	templateUrl: './templates/logout.component.html'
})
export class LogOutComponent {
	constructor(private authService: AuthService, private router: Router) {}

	onLogOut() {
		this.authService.logOut();
		this.router.navigate(['/authentication', 'signin']);
	}
}
