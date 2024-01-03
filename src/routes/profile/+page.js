import { db } from '$lib/db';

export async function load() {
	return {
		images: await db.listImages()
	};
}
