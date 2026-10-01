import { z } from 'astro/zod';
import { heroCardContent } from '@/lib/siteContent';

export const ogImagePathSchema = z
	.string()
	.regex(
		/^\/og\/[a-zA-Z0-9][a-zA-Z0-9_-]*(?:\/[a-zA-Z0-9][a-zA-Z0-9_-]*)*\.(?:png|jpg|jpeg|webp)$/,
		'Use uma imagem local PNG, JPEG ou WebP em /og/, sem query ou hash.'
	);

// O mesmo contrato vale para frontmatter e props diretas, sem truncamento.
export const seoFields = {
	metaTitle: z.string().trim().min(1).max(70).optional(),
	metaDescription: z.string().trim().min(1).max(200).optional(),
	ogTitle: z.string().trim().min(1).max(70).optional(),
	ogDescription: z.string().trim().min(1).max(200).optional(),
	seoTitle: z.string().trim().min(1).max(70).optional(),
	seoDescription: z.string().trim().min(1).max(200).optional(),
	language: z.enum(['pt-BR', 'en']).default('pt-BR'),
	ogLocale: z.enum(['pt_BR', 'en_US']).optional(),
	ogImage: ogImagePathSchema.optional(),
	ogImageAlt: z.string().trim().min(1).optional(),
};

export const hasImageAndAlt = (data: {
	ogImage?: string;
	ogImageAlt?: string;
}) => Boolean(data.ogImage) === Boolean(data.ogImageAlt);

export const imagePairError = {
	message: 'Informe ogImage e ogImageAlt juntos, ou omita ambos.',
	path: ['ogImageAlt'],
};

export const seoMetadataSchema = z
	.object(seoFields)
	.refine(hasImageAndAlt, imagePairError);

export interface SEOProps {
	title?: string;
	description?: string;
	metaTitle?: string;
	metaDescription?: string;
	ogTitle?: string;
	ogDescription?: string;
	seoTitle?: string;
	seoDescription?: string;
	noindex?: boolean;
	language?: 'pt-BR' | 'en';
	ogLocale?: 'pt_BR' | 'en_US';
	ogImage?: string;
	ogImageAlt?: string;
	type?: 'website' | 'article' | 'profile';
	author?: string;
	article?: {
		publishedTime?: Date;
		authorURL?: string;
		section?: string;
		tags?: string[];
	};
}

interface SEODefaults {
	title: string;
	description: string;
	siteName: string;
	ogImage: string;
	ogImageAlt: string;
}

export const seoDefaults: SEODefaults = {
	title: 'Vitor Hugo | Desenvolvedor de Software',
	description: heroCardContent.description,
	siteName: 'Portfólio | Vitor Hugo',
	ogImage: '/og/institucional-v3.png',
	ogImageAlt:
		'Cartão editorial de Vitor Hugo, Desenvolvedor de Software, com a descrição Aplicações web · integrações · automações e o endereço vitorhugodev.com.',
};
