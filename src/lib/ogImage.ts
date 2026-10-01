import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { ogImagePathSchema } from './seo';

const WIDTH = 1200;
const HEIGHT = 630;
const MAX_BYTES = 5_000_000;
const TARGET_BYTES = 500_000;
const formats = {
	'.png': { format: 'png', type: 'image/png' },
	'.jpg': { format: 'jpeg', type: 'image/jpeg' },
	'.jpeg': { format: 'jpeg', type: 'image/jpeg' },
	'.webp': { format: 'webp', type: 'image/webp' },
} as const;

interface ImageMetadata {
	width: number;
	height: number;
	type: string;
}

const cache = new Map<
	string,
	{ fingerprint: string; result: Promise<ImageMetadata> }
>();

function assertConfined(directory: string, file: string) {
	const path = relative(directory, file);
	if (!path || path === '..' || path.startsWith(`..${sep}`) || isAbsolute(path)) {
		throw new Error('A imagem Open Graph deve permanecer dentro de public/og/.');
	}
}

async function decodeImage(file: string, path: string, size: number) {
	const buffer = await readFile(file);
	if (buffer.length !== size) {
		throw new Error(`A imagem Open Graph mudou durante a leitura: ${path}`);
	}
	const expected = formats[extname(path) as keyof typeof formats];
	const decoder = sharp(buffer, {
		failOn: 'warning',
		limitInputPixels: WIDTH * HEIGHT,
	});
	const metadata = await decoder.metadata();
	// O formato identificado pelo decoder deve corresponder à extensão pública.
	if (metadata.format !== expected.format) {
		throw new Error(`Formato real e extensão Open Graph incompatíveis: ${path}`);
	}
	// libvips não expõe frames APNG. Recusar conservadoramente a assinatura
	// do controle de animação (acTL), sem implementar um parser de PNG.
	const hasAPNGControl =
		metadata.format === 'png' &&
		buffer.includes(Buffer.from('000000086163544c', 'hex'));
	if (
		(metadata.pages ?? 1) > 1 ||
		metadata.loop !== undefined ||
		Boolean(metadata.delay?.length) ||
		hasAPNGControl
	) {
		throw new Error(`A imagem Open Graph não pode ser animada: ${path}`);
	}
	if (metadata.orientation !== undefined && metadata.orientation !== 1) {
		throw new Error(
			`Exporte a imagem Open Graph com orientação normalizada, sem rotação EXIF: ${path}`
		);
	}
	if (metadata.width !== WIDTH || metadata.height !== HEIGHT) {
		throw new Error(`A imagem Open Graph deve ter exatamente 1200×630: ${path}`);
	}
	// metadata() não decodifica pixels: validar também o conteúdo comprimido.
	const { info } = await decoder.raw().toBuffer({ resolveWithObject: true });
	if (info.width !== WIDTH || info.height !== HEIGHT) {
		throw new Error(`Dimensões decodificadas Open Graph inválidas: ${path}`);
	}
	if (size > TARGET_BYTES) {
		console.warn(
			`[OG] ${path}: ${size} bytes; alvo editorial de até 500.000 bytes.`
		);
	}
	return { width: WIDTH, height: HEIGHT, type: expected.type };
}

// Somente leitura no build/dev: sem rede, transformação ou geração de arquivos.
// publicDir vem da configuração resolvida do Astro, nunca de process.cwd().
export async function getSEOImageMetadata(path: string, publicDir: URL) {
	ogImagePathSchema.parse(path);
	const publicPath = await realpath(fileURLToPath(publicDir));
	const ogPath = await realpath(resolve(publicPath, 'og'));
	assertConfined(publicPath, ogPath);
	const file = await realpath(resolve(ogPath, path.slice('/og/'.length)));
	assertConfined(ogPath, file);
	const fileStat = await stat(file);
	if (!fileStat.isFile() || fileStat.size >= MAX_BYTES) {
		throw new Error(
			`A imagem Open Graph deve ser um arquivo menor que 5.000.000 bytes: ${path}`
		);
	}
	// Reavaliar realpath e stat a cada chamada, inclusive no dev e para symlinks.
	const fingerprint = `${fileStat.size}:${fileStat.mtimeMs}:${fileStat.ctimeMs}`;
	const key = `${file}:${extname(path)}`;
	const existing = cache.get(key);
	if (existing?.fingerprint === fingerprint) return existing.result;
	const result = decodeImage(file, path, fileStat.size).catch((cause) => {
		if (cache.get(key)?.result === result) cache.delete(key);
		const reason = cause instanceof Error ? cause.message : String(cause);
		throw new Error(`Falha ao validar a imagem Open Graph ${path}: ${reason}`, {
			cause,
		});
	});
	cache.set(key, { fingerprint, result });
	return result;
}
