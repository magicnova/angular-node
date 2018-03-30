import {
	SIGN_UP_USER,
	SIGN_IN_USER,
	CONTENT_TYPE_JSON
} from './../app.backend';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
	constructor(private httpService: Http) {}

	singUp(user: User) {
		const body = JSON.stringify(user);
		return this.httpService
			.post(SIGN_UP_USER, user, {
				headers: CONTENT_TYPE_JSON
			})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}

	singIn(user: User) {
		const body = JSON.stringify(user);
		return this.httpService
			.post(SIGN_IN_USER, user, {
				headers: CONTENT_TYPE_JSON
			})
			.map((response: Response) => response.json())
			.catch((error: Response) => Observable.throw(error.json()));
	}

	logOut() {
		localStorage.clear();
	}

	isLoggedIn() {
		return localStorage.getItem('token') !== null;
	}
}
