// @ts-check
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://vitorhugodev.com',
    integrations: [react(), icon(), mdx()],
    adapter: vercel(),

    vite: {
        plugins: [tailwindcss()],
    },
});