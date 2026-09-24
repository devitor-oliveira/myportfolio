import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Comment } from '@/lib/commentContracts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: Date,
  day: boolean = false,
  year: boolean = false,
): string {
  if (year) return date.toLocaleDateString("pt-BR", { year: "numeric" });

  return day
    ? date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : date
        .toLocaleDateString("pt-BR", {
          month: "short",
          year: "numeric",
        })
        .replace(". de", ",");
}

export const terminalTitles: string[] = [
  "[ Vitor Dev ]",
  "[ Full Stack ]",
  "[ Disponível para Projetos ]",
];

export const commands = ["/ultimo-post", "/ultimo-projeto", "/sobre"];

export const MOCK_COMMENTS: Comment[] = [
  {
    key: "comment-1",
    data: {
      name: "Ana Silva",
      status: "approved",
      comment:
        "Trabalhar com o Vitor no desenvolvimento do sistema foi excelente. Domínio técnico em backend e Fastify muito acima da média!",
      jobtitle: "Tech Lead",
      postedon: "2026-02-15",
      experience: "Desenvolvedor Front-end Sênior",
      relationship: "Colega de trabalho",
      github: "github.com/anacoder",
      linkedin: "linkedin.com/in/ana-silva",
    },
  },
  {
    key: "comment-2",
    data: {
      name: "Carlos Oliveira",
      status: "approved",
      comment:
        "Ótimo profissional! Entregou a landing page em Next.js com design impecável, performance alta e dentro do prazo combinado.",
      jobtitle: "Product Manager",
      postedon: "2026-01-10",
      experience: "Outro",
      relationship: "Cliente",
      linkedin: "linkedin.com/in/carlos-oliveira",
    },
  },
  {
    key: "comment-3",
    data: {
      name: "Mariana Costa",
      status: "approved",
      comment:
        "Dedicação impressionante com automações em N8N e self-hosting. Sempre colaborando com a comunidade e trazendo boas soluções.",
      jobtitle: "Desenvolvedora Frontend",
      postedon: "2025-11-20",
      experience: "senior-frontend-2024",
      relationship: "Comunidade",
      github: "github.com/mariana-costa",
    },
  },
  {
    key: "comment-4",
    data: {
      name: "Fernanda Ribeiro Martins",
      status: "approved",
      comment:
        "Trabalhamos juntos por quase dois anos e posso dizer com segurança que é raro encontrar alguém com tanta combinação de rigidez técnica, senso de produto e comunicação clara. O Vitor liderou a migração de um monolito legado para uma arquitetura de microsserviços com Fastify e Kafka, reduzindo o tempo de resposta médio de 900ms para 120ms, sem nunca deixar de documentar decisões ou avisar a equipe sobre quebras de contrato. Além disso, participava ativamente das code reviews com comentários construtivos e sempre pegou tarefas difíceis que ninguém queria assumir. Recomendo sem ressalvas.",
      jobtitle: "Engineering Manager Senior",
      postedon: "2024-09-03",
      experience: "desenvolvedor-fullstack-2023",
      relationship: "Gerenciamento direto",
      github: "github.com/fernanda-ribeiro-martins-dev",
      linkedin:
        "https://www.linkedin.com/in/fernanda-ribeiro-martins-developer",
    },
  },
  {
    key: "comment-5",
    data: {
      name: "João Pedro Albuquerque de Sousa e Menezes",
      status: "approved",
      comment:
        "O Vitor foi essencial no projeto da plataforma de analytics em tempo real. Cuidou do pipeline de dados, do frontend e ainda ajudou o time de backend.",
      jobtitle: "Engenheiro de Dados Sênior Especialista em Streaming",
      postedon: "2026-03-01",
      experience: "Outro",
      relationship: "Colega de projeto",
      github: "github.com/joao-pedro-menezes",
    },
  },
  {
    key: "comment-6",
    data: {
      name: "Roberto Lima",
      status: "approved",
      comment: "Excelente profissional, pontual e super recomendo.",
      jobtitle: "Designer",
      postedon: "2024-05-18",
      experience: "Outro",
      relationship: "Cliente",
    },
  },
  {
    key: "comment-7",
    data: {
      name: "Patrícia Moura",
      status: "approved",
      comment:
        "Uma parceria que já dura anos e rendeu projetos incríveis, sempre com muita autonomia e entregas acima do esperado.",
      jobtitle: "Scrum Master",
      postedon: "2023-02-28",
      experience:
        "Engenheiro de Software Pleno - Especialista em Sistemas Distribuídos",
      relationship: "Parceiro de projeto de longa duração",
      linkedin:
        "linkedin.com/in/patricia-moura-arquitetura-de-software-e-plataformas-digitais",
    },
  },
  {
    key: "comment-8",
    data: {
      name: "Thiago Fernandes",
      status: "approved",
      comment:
        "Contratamos o Vitor para dar manutenção e evolução em um sistema legado crítico que ninguém mais conseguia tocar. Em poucas semanas ele não só estabilizou a aplicação como também propôs uma reestruturação completa do deploy, migrando a infraestrutura para contêineres com orquestração, implementando observabilidade com métricas e logs centralizados e automatizando os testes de regressão. O resultado foi uma redução drástica de incidentes em produção e um tempo de mercado muito menor para novas features. Sem dúvida um dos profissionais mais completos com quem já trabalhei, recomendo fortemente para qualquer desafio técnico ou de liderança de equipe.",
      jobtitle: "CTO",
      postedon: "2025-07-30",
      experience: "senior-frontend-2024",
      relationship: "Fundador",
      github:
        "github.com/thiago-fernandes-DevOps-Automation-Infrastructure-Team-2024",
    },
  },
];
