import useSWR from "swr";

export interface CommentData {
  name: string;
  status: string;
  comment: string;
  jobtitle: string;
  postedon: string;
  experience: string;
  relationship: string;
  github?: string;
  linkedin?: string;
}

export interface Comment {
  key: string;
  data: CommentData;
}

export interface CommentsApiResponse {
  total: number;
  comments: Comment[];
}
const WEBHOOK_URL = import.meta.env.PUBLIC_GET_COMMENTS_WEBHOOK_URL;

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
  return res.json();
};

export function useGetComments(initialData?: CommentsApiResponse) {
  const { data, error, isLoading, mutate } = useSWR<CommentsApiResponse>(
    `${WEBHOOK_URL}?action=list`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      dedupingInterval: 5 * 60 * 1000,
      fallbackData: initialData,
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
    refetch: mutate, // Função para revalidar/recarregar os dados manualmente
  };
}
