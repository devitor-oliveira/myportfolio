export type CommandConfig = {
  description: string;
  handler: () => Promise<string>;
};

export const commandRegistry: Record<string, CommandConfig> = {
  "/last-post": {
    description: "Navega para o artigo mais recente",
    handler: async () => {
      const response = await fetch("/api/terminalData.json");
      if (!response.ok) throw new Error("Erro ao carregar o manifesto");

      const data = await response.json();

      if (!data.latestPost)
        throw new Error("Nenhum post publicado encontrado.");

      setTimeout(() => {
        window.location.href = data.latestPost.url;
      }, 3000);

      return `Encontrado! Abrindo "${data.latestPost.title}"...`;
    },
  },
  "/sobre": {
    description: "Navega para a página Sobre",
    handler: async () => {
      setTimeout(() => {
        window.location.href = "/sobre";
      }, 3000);

      return `Abrindo a página Sobre...`;
    },
  },
};
