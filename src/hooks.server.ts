import { request } from '@playwright/test';
import type { Handle } from '@sveltejs/kit';
import { auth } from "$lib/server/lucia";
import { sequence } from "@sveltejs/kit/hooks";


const customHandle: Handle = async ({ event, resolve }) => {
	//TODO 3 do we really need this? From example code
	// let userid = event.cookies.get('userid');

	// if (!userid) {
	// 	// if this is the first time the user has visited this app,
	// 	// set a cookie so that we recognise them when they return
	// 	userid = crypto.randomUUID();
	// 	event.cookies.set('userid', userid, { path: '/' });
	// }

	// event.locals.userid = userid;

	return resolve(event);
};

export const handle = sequence(auth.handleHooks(), customHandle);