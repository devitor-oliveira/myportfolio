import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const ogFields = {
	ogImage: z
		.string()
		.regex(
			/^\/og\/[a-zA-Z0-9][a-zA-Z0-9/_-]*\.png$/,
			'Use um PNG local em /og/, sem query ou hash.'
		)
		.optional(),
	ogImageAlt: z.string().trim().min(1).optional(),
};

// Validar o par antes de aplicar qualquer fallback institucional no componente.
const hasImageAndAlt = (data: {
	ogImage?: string;
	ogImageAlt?: string;
}) => Boolean(data.ogImage) === Boolean(data.ogImageAlt);

const imagePairError = {
	message: 'Informe ogImage e ogImageAlt juntos, ou omita ambos.',
	path: ['ogImageAlt'],
};

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z
		.object({
			title: z.string(),
			topic: z.string().optional(),
			description: z.string(),
			date: z.coerce.date(),
			tags: z.array(z.string()).optional(),
			author: z.string().optional(),
			...ogFields,
		})
		.refine(hasImageAndAlt, imagePairError),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z
		.object({
			type: z.enum([
				'pessoal',
				'profissional',
				'open-source',
				'freelance',
				'corporativo',
			]),
			title: z.string(),
			description: z.string(),
			year: z.coerce.date(),
			yearEnd: z.coerce.date().optional(),
			// update: z.coerce.date().optional(),
			liveURL: z.string().optional(),
			repositoryURL: z.string().optional(),
			tags: z.array(z.string()).optional(),
			...ogFields,
		})
		.refine(hasImageAndAlt, imagePairError),
});

export const collections = { blog, projects };
