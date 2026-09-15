import type { APIRoute } from "astro";
import type { CommentsApiResponse } from "@/hooks/useGetComments";

// Fetch em build pra evitar layout shift
// Melhorar entrega de comentários pré-existentes
// Migrar para API ROUTE
const URL = import.meta.env.PUBLIC_GET_COMMENTS_WEBHOOK_URL;

export const GET: APIRoute = async () => {
  let initialComments: CommentsApiResponse;

  try {
    const res = await fetch(`${URL}?action=list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!res.ok) throw new Error(`Failed: ${res.status}`);

    initialComments = await res.json();
  } catch (e: unknown) {
    initialComments = { total: 0, comments: [] };
    console.error("Falha na busca de comentários", e);
  }
  return new Response(JSON.stringify({ initialComments }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
