import type { CardProps } from "@/components/Card/HeroCard.astro";
import type { socialItem } from "@/components/ui/SocialLink";

export const SocialLinks: Record<string, socialItem[]> = {
  linkedin: [
    {
      icon: "mdi:share-variant",
      link: "https://www.linkedin.com/in/vitor-guedesdev/",
      tooltipValue: "Perfil Profissional",
    },
  ],
  github: [
    {
      icon: "mdi:console",
      link: "https://github.com/devitor-oliveira",
      tooltipValue: "Meus Projetos",
    },
  ],
  discord: [
    {
      icon: "mdi:chat-bubble-outline",
      link: "https://discord.gg/VHbfhkCSA",
      tooltipValue: "Servidor no discord",
    },
  ],
  email: [
    {
      icon: "mdi:mailbox",
      link: "mailto:contato.dev@gmail.com",
      tooltipValue: "Enviar E-mail",
    },
  ],
};

export const contato = {
  email: "contato.dev@gmail.com",
};

// About
export enum ExperienceValue {
  MASTERCLASSIC_DEV = "masterclassic-2025-2026",
  FREELANCE_HELOYSA = "fullstack-2026",
  MASTERCLASSIC_OPS = "op-2025",
  MASTERMAQ = "adm_2022",
  OUTRO = "outros",
}

export interface Experience {
  value: ExperienceValue;
  year: string;
  yearEnd?: string;
  title: string;
  company: string;
  label: string;
  description: string;
  link: string;
}

export const EXPERIENCES: Experience[] = [
  {
    value: ExperienceValue.MASTERCLASSIC_DEV,
    year: "2025",
    yearEnd: "2026",
    title: "Dev & Transformação Digital",
    company: "MasterClassic Seguros",
    label: "MasterClassic Seguros (2025-2026)",
    description:
      "Atuação em projetos de transformação digital, com desenvolvimento de APIs, automações e integrações entre sistemas. Entre os principais trabalhos, participei da arquitetura e desenvolvimento da integração do Pix Automático com sistemas internos da empresa.",
    link: "",
  },

  {
    value: ExperienceValue.FREELANCE_HELOYSA,
    year: "2026",
    title: "Desenvolvedor Fullstack",
    company: "Cliente",
    label: "Imobiliária Heloysa Maria",
    description:
      "Desenvolvimento completo de uma plataforma imobiliária, passando por interface, backend, banco de dados, autenticação, segurança e infraestrutura.",
    link: "https://heloysamaria.com.br",
  },

  {
    value: ExperienceValue.MASTERCLASSIC_OPS,
    year: "2025",
    title: "Operações & Automações",
    company: "MasterClassic Seguros",
    label: "",
    description:
      "Atuação em processos operacionais e automação de rotinas, criando planilhas para relatórios, organização de dados e integração entre sistemas. Essa experiência marcou minha transição da área operacional para desenvolvimento e transformação digital.",
    link: "",
  },
];

export const EXPERIENCE_OPTIONS = [
  ...EXPERIENCES.map(({ value, label }) => ({ value, label })),
  { value: ExperienceValue.OUTRO, label: "Outros" },
] as const;

// Hero
const heroCardSocials = ["linkedin", "github", "discord", "email"];

export const heroCardContent: CardProps = {
  title: "Transformo problemas e processos em soluções de software.",
  description:
    "Desenvolvo aplicações web, integrações e automações, do entendimento do problema à entrega em produção, considerando o contexto e quem vai utilizar a solução.",
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
