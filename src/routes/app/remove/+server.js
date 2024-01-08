// @ts-nocheck
import { error } from '@sveltejs/kit';
import fetch from 'node-fetch';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	try {
		const imageBody = await request.json();

		const visionEndpoint =
			env.SECRET_VISION_ENDPOINT +
			'/computervision/imageanalysis:segment?api-version=2023-02-01-preview&mode=backgroundRemoval';
		const visionKey = env.SECRET_VISION_KEY;

		const response = await fetch(visionEndpoint, {
			method: 'POST',
			headers: {
				'Ocp-Apim-Subscription-Key': visionKey,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				url: imageBody.imageUrl
			})
		});

		const imageBytes = await response.arrayBuffer();

		return new Response(imageBytes, {
			headers: {
				'Content-Type': 'image/png'
			}
		});
	} catch (err) {
		throw error(400, err.message);
	}
}
