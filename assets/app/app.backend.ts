import { Headers } from '@angular/http';

const BACKEND_URL = 'http://localhost:3000';
export const CONTENT_TYPE_JSON = new Headers({
	'Content-Type': 'application/json'
});
export const ADD_MESSAGE_URL = `${BACKEND_URL}/message`;
export const GET_MESSAGES_URL = `${BACKEND_URL}/message`;
export const UPDATE_MESSAGE_URL = `${BACKEND_URL}/message/`;
export const DELETE_MESSAGE_URL = `${BACKEND_URL}/message/`;

export const SIGN_UP_USER = `${BACKEND_URL}/user`;
