import { AuthenticationComponent } from './auth/authentication.component';
import { MessagesComponent } from './messages/messages.component';
import { Routes, RouterModule } from '@angular/router';
const APP_ROUTES: Routes = [
	{
		path: '',
		redirectTo: '/messages',
		pathMatch: 'full'
	},
	{
		path: 'messages',
		component: MessagesComponent
	},
	{
		path: 'authentication',
		component: AuthenticationComponent
	}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
