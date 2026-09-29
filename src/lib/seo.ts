import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { heroCardContent } from '@/lib/siteContent';

export interface SEOProps {
	title?: string;
	description?: string;
	ogImage?: string;
	ogImageAlt?: string;
	type?: 'website' | 'article';
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
	locale: string;
	ogImage: string;
	ogImageAlt: string;
}

export const seoDefaults: SEODefaults = {
	title: 'Portfólio | Vitor Hugo',
	description: heroCardContent.description,
	siteName: 'Portfólio | Vitor Hugo',
	locale: 'pt_BR',
	ogImage: '/og/institucional.png',
	ogImageAlt:
		'Vitor Hugo — Desenvolvimento web, integrações e automações. vitorhugodev.com',
};

// Somente arquivos públicos locais: sem rede, geração ou endpoint de imagens.
export async function getSEOImageMetadata(path: string) {
	if (!/^\/og\/[a-zA-Z0-9][a-zA-Z0-9/_-]*\.png$/.test(path)) {
		throw new Error('A imagem Open Graph deve ser um PNG local em /og/.');
	}
	const buffer = await readFile(resolve('public', path.slice(1)));
	const signature = '89504e470d0a1a0a';
	if (
		buffer.length < 24 ||
		buffer.subarray(0, 8).toString('hex') !== signature ||
		buffer.toString('ascii', 12, 16) !== 'IHDR'
	) {
		throw new Error(`Imagem Open Graph PNG inválida: ${path}`);
	}
	const width = buffer.readUInt32BE(16);
	const height = buffer.readUInt32BE(20);
	if (!width || !height) {
		throw new Error(`Dimensões Open Graph inválidas: ${path}`);
	}
	return { width, height, type: 'image/png' };
}
