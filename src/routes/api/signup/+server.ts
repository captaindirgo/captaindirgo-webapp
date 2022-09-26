import { auth } from '$lib/server/lucia';
import { type invalid, type redirect, type Actions, type RequestHandler, json } from '@sveltejs/kit';
import { setCookie } from 'lucia-sveltekit';
import { type SignupRequest, SignupRequestC, type SignupResponse } from '$lib/types'
import * as t from 'io-ts'
import * as e from 'fp-ts/Either'
import * as u from '$lib/utils'
import { getOrElse } from 'fp-ts/lib/EitherT';
import { pipe } from 'fp-ts/lib/function';
import { failure } from 'io-ts/lib/PathReporter';

//export const POST : RequestHandler ({ request} ) : Promise<SignupResponse>) => {
//export async function POST ({ request : Request } ) : Promise<Response> {
export const POST : RequestHandler = async (ev) => {
	try {
		const rawreq = await ev.request.json();
		
		const req = pipe(rawreq,
			SignupRequestC.decode,
			e.getOrElseW((err) => {throw {name: 'BAD_REQUEST', fields: failure(err)}})
			)

		const createUser = await auth.createUser('username', req.username, {
			password: req.password,
			user_data: {
				'username' : req.username,
				'email' : req.email
			}
		});
		setCookie(ev.cookies, ...createUser.cookies);

		return json({ user: {username : req.username} , errors: []})
		//return { user: {username : req.username} , errors: []}
	} catch (error) {
		if(error instanceof Error) {
			if (
				error.message === 'AUTH_DUPLICATE_IDENTIFIER_TOKEN' ||
				error.message === 'AUTH_DUPLICATE_USER_DATA'
			) {
				return json({ user: undefined,errors: [{name: 'SIGNIN_USER_ALREADY_TAKEN'}]});
			}
			console.error(error);
			return json({ user: undefined,errors: [{name: 'UNKNOWN_ERROR'}]});
		}
		else {
			return json({ user: undefined,errors: [{name: 'UNKNOWN_ERROR'}]});
		}
	}
}

