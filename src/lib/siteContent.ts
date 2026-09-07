import type { CardProps } from "@/components/Card/HeroCard.astro";
import type { socialItem } from "@/components/ui/SocialLink";

export enum ExperienceValue {
  SENIOR_FRONTEND_2024 = "senior-frontend-2024",
  FRONTEND_2023 = "frontend-2023",
  JUNIOR_2022 = "junior-2022",
  OUTRO = "outro",
}

export interface Experience {
  value: ExperienceValue;
  year: string;
  title: string;
  label: string;
  description: string;
  link: string;
}

export const EXPERIENCES: Experience[] = [
  {
    value: ExperienceValue.SENIOR_FRONTEND_2024,
    year: "2024",
    title: "Desenvolvedor Front-end Sênior",
    label: "Desenvolvedor Front-end Sênior (2024)",
    description:
      "Liderança técnica em aplicações web de alta escala, arquitetura de componentes, code review e mentoria de desenvolvedores júnior em um time ágil.",
    link: "https://example.com/experience/senior-frontend",
  },
  {
    value: ExperienceValue.FRONTEND_2023,
    year: "2023",
    title: "Desenvolvedor Front-end",
    label: "Desenvolvedor Front-end (2023)",
    description:
      "Desenvolvimento de interfaces com React e TypeScript, integração de APIs REST, testes e melhorias de performance e acessibilidade.",
    link: "https://example.com/experience/frontend",
  },
  {
    value: ExperienceValue.JUNIOR_2022,
    year: "2022",
    title: "Desenvolvedor Web Júnior",
    label: "Desenvolvedor Web Júnior (2022)",
    description:
      "Construção de landing pages e sites responsivos, manutenção de projetos legados e colaboração com designers e product managers.",
    link: "https://example.com/experience/junior",
  },
];

export const EXPERIENCE_OPTIONS = [
  ...EXPERIENCES.map(({ value, label }) => ({ value, label })),
  { value: ExperienceValue.OUTRO, label: "Outro" },
] as const;

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
