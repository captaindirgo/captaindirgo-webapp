import { request } from '@playwright/test';
import type { Handle } from '@sveltejs/kit';
import { auth } from "$lib/server/lucia";
import { sequence } from "@sveltejs/kit/hooks";
import { locale } from '$lib/translations';


const customHandle: Handle = async ({ event, resolve }) => {

	// if (cookies.language) {
	// 	locale.set(cookies.language);

	// 	// Attach user setting into local env (this is optional)
	// 	event.locals.language = cookies.language;
	// }

	return resolve(event);
};

export const handle = sequence(auth.handleHooks(), customHandle);