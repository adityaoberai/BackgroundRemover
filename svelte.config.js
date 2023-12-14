import adapter from '@sveltejs/adapter-vercel';
import { preprocessMeltUI } from '@melt-ui/pp';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sequence from 'svelte-sequential-preprocessor';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sequence([
		vitePreprocess(),
		preprocessMeltUI()
	]),
	kit: {
		adapter: adapter({
			maxDuration: 60,
		})
	}
};

export default config;
