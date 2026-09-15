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
      "Arquitetura e desenvolvimento da plataforma de integração do Pix Automático com o Banco do Brasil, criação de APIs REST em Node.js/Fastify e interfaces reativas em Next.js. Atuação na modelagem de banco de dados e autenticação com Supabase, orquestração de fluxos de automação e integração de ERPs via N8N, gerenciamento de servidores auto-hospedados (Coolify, Hetzner, Docker) e dicas operacionais no uso de IA.",
    link: "",
  },
  {
    value: ExperienceValue.FREELANCE_HELOYSA,
    year: "2026",
    title: "Desenvolvedor Fullstack",
    company: "Cliente",
    label: "Imobiliária Heloysa Maria",
    description:
      "Desenvolvimento da plataforma web da corretora Heloysa Maria. Construída com Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Supabase (PostgreSQL/Auth) e Cloudinary.",
    link: "https://heloysamaria.com.br",
  },
  {
    value: ExperienceValue.MASTERCLASSIC_OPS,
    year: "2025",
    title: "Auxiliar de Operações & Automações",
    company: "MasterClassic Seguros",
    label: "",
    description:
      "Gestão operacional no ERP STAR (movimentação de apólices, faturas, cancelamentos, inclusões e relatórios de comissões/carteira). Criação de automação via Google Planilhas (JS) para envio automatizado de relatórios mensais e suporte técnico (Análise e organização de dados) na migração da base de dados para o ERP LIS. Automações de processos com N8N, Typebot, Zapbot e integração com CRM baseado em Odoo. Gerenciamento de conteúdo e site no Wordpress.",
    link: "",
  },
  {
    value: ExperienceValue.MASTERMAQ,
    year: "2022",
    title: "Assistente Administrativo",
    company: "Mastermaq Software",
    label: "Mastermaq Software (2022)",
    description:
      "Suporte à implementação da metodologia ágil SCRUM na universidade corporativa, mapeamento, padronização e documentação de processos internos e desenvolvimento de planilhas no Excel para controle de métricas da metodologia.",
    link: "",
  },
];

export const EXPERIENCE_OPTIONS = [
  ...EXPERIENCES.map(({ value, label }) => ({ value, label })),
  { value: ExperienceValue.OUTRO, label: "Outros" },
] as const;

// Hero
const heroCardSocials = ["linkedin", "github", "discord"];

export const heroCardContent: CardProps = {
  title: "Seja Bem Vindo ao meu Refúgio Digital",
  description:
    "Desenvolvo aplicações web modernas, desde o design de interfaces intuitivas, funcionais e acessíveis até a construção do back-end, automações e infraestrutura completa, sinta-se à vontade para explorar. ",
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
