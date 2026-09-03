import type { CardProps } from "@/components/Card/HeroCard.astro";
import type { socialItem } from "@/components/ui/SocialLink";

export const SocialLinks: Record<string, socialItem[]> = {
  linkedin: [
    {
      icon: "ic:baseline-share",
      link: "https://www.linkedin.com/in/vitor-oliveira-0a1b2b1a3/",
      tooltipValue: "Perfil Profissional",
    },
  ],
  github: [
    {
      icon: "ic:round-terminal",
      link: "https://github.com/devitor-oliveira",
      tooltipValue: "Meus Projetos",
    },
  ],
  discord: [
    {
      icon: "mdi:chat-bubble-outline",
      link: "https://discord.gg/VHbfhkCSA",
      tooltipValue: "Meu servidor no discord",
    },
  ],
  email: [
    {
      icon: "mdi:mailbox",
      link: "contato.dev@gmail.com",
      tooltipValue: "E-mail",
    },
  ],
};

const heroCardSocials = ["linkedin", "github", "discord"];

export const heroCardContent: CardProps = {
  title: "Obrigado por vir! Sou desenvolvedor Full Stack",
  description:
    "Desenvolvo aplicações web ponta a ponta. Desde o design de interfaces intuitivas, funcionais e acessíveis até a construção do back-end, automações e infraestrutura completa, sinta-se à vontade para explorar meu portfólio e entrar em contato. ",
  techstack: [
    "Typescript",
    "React",
    "NextJS",
    "Docker",
    "Fastify",
    "NodeJS",
    "PostgreSQL",
    "N8N",
    "Supabase",
  ],
  socials: heroCardSocials,
};
