import type { CardProps } from "@/components/Card/HeroCard.astro";

const socials = ["linkedin", "github", "discord"];

export const heroCardContent: CardProps = {
  title: "Obrigado por vir! Sou desenvolvedor Full Stack",
  description:
    "Desenvolvo aplicações web ponta a ponta. Desde o design de interfaces intuitivas, funcionais e acessíveis até a construção do back-end, automações e infraestrutura completa,  descubra mais sobre mim.",
  techstack: ["Typescript", "React", "Next.js", "Docker"],
  socials: socials,
};
