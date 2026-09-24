import type { APIRoute } from "astro";
import { COMMENTS_CACHE_SECONDS, COMMENTS_CACHE_TAG } from "@/lib/commentCache";
import {
  commentsResponseSchema,
  makeCommentsSchema,
} from "@/lib/commentContracts";
import { normalizeProfileUrl } from "@/lib/profileUrl";

export const prerender = false;

const TIMEOUT_MS = 8000;

export const GET: APIRoute = async ({ request }) => {
  // Consultas arbitrárias não devem criar uma entrada distinta na CDN por URL.
  if (new URL(request.url).search || request.headers.has("authorization")) {
    return Response.json(
      { error: "Requisição inválida." },
      {
        status: 400,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
  const webhook: unknown = import.meta.env.GET_COMMENTS_WEBHOOK_URL;
  if (typeof webhook !== "string" || !webhook) {
    return Response.json(
      { error: "Comentários indisponíveis." },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  try {
    const url = new URL(webhook);
    url.searchParams.set("action", "list");
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) throw new Error("Falha na consulta dos comentários");

    const payload: unknown = await response.json();
    const parsed = makeCommentsSchema.safeParse(payload);
    if (!parsed.success) {
      throw new Error("Formato de comentários inesperado", {});
    }
    const approved = parsed.data.comments.filter(
      (comment) => comment.data.status.toLowerCase() === "approved",
    );
    const comments = approved.map((comment) => ({
      key: comment.key,
      data: {
        name: comment.data.name,
        status: "approved",
        comment: comment.data.comment,
        jobtitle: comment.data.jobtitle ?? "",
        postedon: comment.data.postedon,
        experience: comment.data.experience ?? "",
        relationship: comment.data.relationship ?? "",
        linkedin:
          normalizeProfileUrl(comment.data.linkedin ?? "", "linkedin") ?? "",
        github: normalizeProfileUrl(comment.data.github ?? "", "github") ?? "",
      },
    }));
    const result = commentsResponseSchema.parse({
      total: comments.length,
      comments,
    });
    return Response.json(result, {
      headers: {
        "Cache-Control": "public, max-age=0",
        "Vercel-CDN-Cache-Control": `public, s-maxage=${COMMENTS_CACHE_SECONDS}`,
        "Vercel-Cache-Tag": COMMENTS_CACHE_TAG,
      },
    });
  } catch {
    return Response.json(
      { error: "Não foi possível carregar os comentários." },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
};
