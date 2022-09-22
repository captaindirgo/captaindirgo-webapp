import type { User } from './types'
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';

export const sessionToken : Writable<String | null> = writable(null);

export function setSession(user : User) {
  	sessionToken.set(user.sessionToken)
}

export function getSession() {
  	get(sessionToken)
}

export function endSession() {
	sessionToken.set(null)
}

export function post(endpoint : any, data : any) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}
