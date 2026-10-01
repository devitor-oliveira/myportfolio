// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://vitorhugodev.com',
	integrations: [
		react(),
		icon(),
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/api/'),
		}),
	],
	adapter: vercel(),

	vite: {
		plugins: [tailwindcss()],
	},
});
