import { imageDb } from '$lib/imagedb';

export async function load() {
	return {
		images: await imageDb.listImages()
	};
}
