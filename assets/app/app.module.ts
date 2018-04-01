import { ErrorService } from './errors/error.service';
import { ErrorComponent } from './errors/error.component';
import { AuthService } from './auth/auth.service';
import { SignInComponent } from './auth/signin.component';
import { SignUpComponent } from './auth/signup.component';
import { LogOutComponent } from './auth/logout.component';
import { routing } from './app.routing';
import { AuthenticationComponent } from './auth/authentication.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessageComponent } from './messages/message.component';
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderComponent } from './shared/header.component';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [
		AppComponent,
		MessageComponent,
		MessageListComponent,
		MessageInputComponent,
		MessagesComponent,
		AuthenticationComponent,
		HeaderComponent,
		LogOutComponent,
		SignUpComponent,
		SignInComponent,
		ErrorComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		routing,
		ReactiveFormsModule,
		HttpModule
	],
	providers: [AuthService, ErrorService],
	bootstrap: [AppComponent]
})
export class AppModule {}
