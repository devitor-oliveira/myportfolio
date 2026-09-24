import type { APIRoute } from "astro";
import { commentInputSchema } from '@/lib/commentContracts';
import { normalizeProfileUrl } from '@/lib/profileUrl';

export const prerender = false;

const TIMEOUT_MS = 8000;
const MAX_BODY_BYTES = 3000;

async function readLimited(request: Request): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } finally {
    reader.releaseLock();
  }
}

function text(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string" || value.length > maxLength) return null;
  // biome-ignore lint/suspicious/noControlCharactersInRegex: Sanitização de caracteres de controle enviados pelo visitante
  return value.replace(/[\u0000-\u001f\u007f]/g, "").trim();
}

export const POST: APIRoute = async ({ request }) => {
  const errorResponse = (message: string, status: number) =>
    Response.json(
      { error: message },
      { status, headers: { "Cache-Control": "no-store" } },
    );

  const webhook: unknown = import.meta.env.COMMENTS_WEBHOOK_URL;

  if (typeof webhook !== 'string' || !webhook) {
    return errorResponse("Envio indisponível.", 503);
  }

  if (
    request.headers.get("content-type")?.split(";")[0] !== "application/json"
  ) {
    return errorResponse("Formato inválido.", 415);
  }
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return errorResponse("Origem inválida.", 403);
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return errorResponse("Comentário muito longo.", 413);
  }
  try {
    const body = await readLimited(request);
    if (body === null) return errorResponse("Comentário muito longo.", 413);
    let data: unknown;
    try {
      data = JSON.parse(body);
    } catch {
      return errorResponse("Dados inválidos.", 400);
    }
    const parsed = commentInputSchema.safeParse(data);
    if (!parsed.success) {
      return errorResponse("Dados inválidos.", 400);
    }
    const fields = parsed.data;
    const name = text(fields.name, 80);
    const comment = text(fields.comment, 500);
    const jobtitle = text(fields.jobtitle, 80);
    const relationship = text(fields.relationship, 80);
    const linkedin = normalizeProfileUrl(fields.linkedin, 'linkedin');
    const github = normalizeProfileUrl(fields.github, 'github');
    if (
      !name ||
      !comment ||
      jobtitle === null ||
      relationship === null ||
      linkedin === null ||
      github === null
    ) {
      return errorResponse("Verifique os campos do comentário.", 400);
    }
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        comment,
        jobtitle,
        relationship,
        linkedin,
        github,
        experience: fields.experience,
        postedon: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) throw new Error("Falha no envio do comentário");
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return errorResponse("Não foi possível enviar o comentário.", 502);
  }
};
