import useSWRImmutable from "swr/immutable";
import { commentsResponseSchema } from '@/lib/commentContracts';
import type { CommentsApiResponse } from '@/lib/commentContracts';

const fetcher = async (url: string): Promise<CommentsApiResponse> => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Erro na requisição: ${res.status}`);
  }
  const payload: unknown = await res.json();
  const parsed = commentsResponseSchema.safeParse(payload);
  if (!parsed.success) throw new Error('Resposta de comentários inválida');
  return parsed.data;
};

export function useGetComments() {
  const { data, error, isLoading } = useSWRImmutable<CommentsApiResponse>(
    "/api/commentsData.json",
    fetcher,
    {
      shouldRetryOnError: false,
    },
  );

  return {
    comments: data?.comments || [],
    total: data?.total || 0,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Erro ao buscar comentários"
      : null,
  };
}
