import { auth } from '$lib/server/lucia';
import { type invalid, type redirect, type Actions, type RequestHandler, json } from '@sveltejs/kit';
import { setCookie } from 'lucia-sveltekit';
import { type LoginRequest, LoginRequestC, type LoginResponse } from '$lib/types'
import * as e from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function';
import { failure } from 'io-ts/lib/PathReporter';

export const POST : RequestHandler = async (ev) => {
	try {
		const rawreq = await ev.request.json();
		
		const req = pipe(rawreq,
			LoginRequestC.decode,
			e.getOrElseW((err) => {throw {name: 'BAD_REQUEST', fields: failure(err)}})
			)

		const userSession = await auth.authenticateUser('username', req.username, req.password);

		setCookie(ev.cookies, ...userSession.cookies);

		return json({ status: "ok" , errors: []} as LoginResponse)
	} catch (error) {
		if(error instanceof Error) {
			if (
				error.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' ||
				error.message === 'AUTH_INVALID_PASSWORD'
			) {
				return json({ status: "bad",errors: [{name: 'LOGIN_USER_OR_PASSWORD_INVALID'}]} as LoginResponse);
			}
			console.error(error);
			return json({ status: "bad",errors: [{name: 'UNKNOWN_ERROR'}]} as LoginResponse);
		}
		else {
			return json({ status: "bad",errors: [{name: 'UNKNOWN_ERROR'}]} as LoginResponse);
		}
	}
}

