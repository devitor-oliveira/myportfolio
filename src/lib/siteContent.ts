import type { CardProps } from "@/components/Card/HeroCard.astro";

const socials = ["linkedin", "github", "discord"];

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
  socials: socials,
};
