import type { APIRoute } from 'astro';
import { dangerouslyDeleteByTag } from '@vercel/functions';
import { COMMENTS_CACHE_TAG } from '@/lib/commentCache';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const token: unknown = import.meta.env.COMMENTS_INVALIDATION_TOKEN;
	const authorization = request.headers.get('authorization');
	if (typeof token !== 'string' || !token || authorization !== `Bearer ${token}`) {
		return Response.json({ error: 'Não autorizado.' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
	}
	try {
		await dangerouslyDeleteByTag(COMMENTS_CACHE_TAG);
		return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
	} catch {
		return Response.json({ error: 'Falha ao atualizar comentários.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
	}
};
