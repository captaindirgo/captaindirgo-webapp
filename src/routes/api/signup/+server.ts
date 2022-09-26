import { auth } from '$lib/server/lucia';
import type { invalid, redirect, Actions } from '@sveltejs/kit';
import { setCookie } from 'lucia-sveltekit';
import { type SignupRequest, SignupRequestC, type SignupResponse } from '$lib/types'
import * as t from 'io-ts'
import * as e from 'fp-ts/Either'
import * as u from '$lib/utils'
import { getOrElse } from 'fp-ts/lib/EitherT';
import { pipe } from 'fp-ts/lib/function';
import { failure } from 'io-ts/lib/PathReporter';

export const actions: Actions = {
	default: async ({ request, cookies }) : Promise<SignupResponse> => {
		try {
			const rawreq = await request.json();
            
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
			setCookie(cookies, ...createUser.cookies);

			return { user: {username : req.username} , errors: []}
		} catch (error) {
			if(error instanceof Error) {
				if (
					error.message === 'AUTH_DUPLICATE_IDENTIFIER_TOKEN' ||
					error.message === 'AUTH_DUPLICATE_USER_DATA'
				) {
					return { user: undefined,errors: [{name: 'SIGNIN_USER_ALREADY_TAKEN'}]};
				}
				console.error(error);
				return { user: undefined,errors: [{name: 'UNKNOWN_ERROR'}]};
			}
			else {
				return { user: undefined,errors: [{name: 'UNKNOWN_ERROR'}]};
			}
		}
	}
};
