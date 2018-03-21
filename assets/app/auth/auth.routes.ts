import { LogOutComponent } from './logout.component';
import { SignInComponent } from './signin.component';
import { SignUpComponent } from './signup.component';
import { Routes } from '@angular/router';
export const AUTH_ROUTES: Routes = [
	{
		path: '',
		redirectTo: 'signup',
		pathMatch: 'full'
	},
	{
		path: 'signup',
		component: SignUpComponent
	},
	{
		path: 'signin',
		component: SignInComponent
	},
	{
		path: 'logout',
		component: LogOutComponent
	}
];
