import { sveltekit } from '@sveltejs/kit/vite';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
    let plugins = [sveltekit()];
    if (mode === 'development') {
        plugins = [nodeLoaderPlugin(), ...plugins];
    }

    return {
        plugins
    };
});