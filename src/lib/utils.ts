import type { User, CaptainDirgoError } from './types'
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';
import type * as T from "io-ts";
import * as E from "fp-ts/Either";
import { failure } from "io-ts/PathReporter";
import { pipe } from "fp-ts/function";

/**
 * @returns the value decoded to specified type, or throws error
 */
export const decodeWith = <
  ApplicationType = any,
  EncodeTo = ApplicationType,
  DecodeFrom = unknown
>(
  codec: T.Type<ApplicationType, EncodeTo, DecodeFrom>
) => (input: DecodeFrom): ApplicationType =>
  pipe(
    codec.decode(input),
    E.getOrElseW((errors) => {
      throw {name: "BAD_REQUEST", fields: failure(errors)};
    })
  );

/**
 * 
 * @param varName name of env var
 * @returns environment variable value of that name, or throws an error if not present
 */
export function getEnvOrDie(varName : string)
{
	let val = process.env[varName]
	if(val === undefined)
	{
		throw new Error(`no val for required env var, ${varName}`)
	}

	return val
}

export const sessionToken : Writable<String | null> = writable(null);

//co : i think lucia handles this now
// export function setSession(user : User) {
//   	sessionToken.set(user.sessionToken)
// }

// export function getSession() {
//   	get(sessionToken)
// }

// export function endSession() {
// 	sessionToken.set(null)
// }

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

export function printError(e : CaptainDirgoError) {
   //TODO 3 internationalize
   return e.name;
}