

import { request } from '@playwright/test';
import type { Handle } from '@sveltejs/kit';

async function makeARandomNumberAsync()
{
	let rn = Math.random()
	console.log(`making a random number ${rn}`)
	return rn;
}

const appWideRandomNumber = makeARandomNumberAsync()

export const handle: Handle = async ({ event, resolve }) => {
	let userid = event.cookies.get('userid');

	if (!userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		userid = crypto.randomUUID();
		event.cookies.set('userid', userid, { path: '/' });
	}

	event.locals.userid = userid;

	const rn = await appWideRandomNumber;
	event.locals.randonNumberHack = rn;

	console.log(`current random number is ${rn}`)

	return resolve(event);
};
