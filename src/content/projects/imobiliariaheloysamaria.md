---
type: freelance
title: Plataforma Imobiliária Heloysa Maria
description: Plataforma web full-stack com foco em SEO, alta performance mobile, custo mensal baixo.
year: 2026-08-30
liveURL: https://heloysamaria.com.br
tags:
  - nextjs
  - typescript
  - supabase
  - postgresql
  - tailwindcss
  - seo
  - docker
  - react
---
## Site de Gestão e Exposição Imobiliária

### Visão Geral

Uma plataforma de gestão de imóveis moderna focada na experiência do usuário final (lead) e da própria cliente. Permitindo contato do interessado com a cliente em poucos cliques, SEO e amostragem dos imóveis e serviços de forma clara e objetiva, permitindo a gestão diária em um painel administrativo simples e intuitivo com custo mensal baixo.

### Meu Papel

Projeto desenvolvido solo, validação do design com a cliente, arquitetura, desenvolvimento full-stack e deploy.

- **Design:** protótipos de UI/UX apresentados e validados diretamente com a cliente.
- **Desenvolvimento:** ambiente self-hosted (VPS Hetzner + Coolify + Docker + Supabase) para prototipagem e iteração com a cliente.
- **Deploy final:** migração para produção com build local da imagem Docker, push para Docker Hub e deploy direto na VPS via Docker Compose (aplicação + Caddy como reverse proxy), reduzindo custo e carga de build no servidor.

### Funcionalidades

- **Área Pública (Portal do Cliente):**
  - Homepage com hero de impacto, vitrine de imóveis em destaque com carregamento em streaming (skeleton) e WhatsApp flutuante para contato imediato.
  - Listagem "Oportunidades" com filtros por finalidade (venda/aluguel/temporada), tipo, faixa de preço (incluindo "preço a combinar"), ordenação e paginação.
  - Página de detalhe do imóvel com galeria de imagens, ficha técnica completa, localização e botão de WhatsApp com mensagem pré-preenchida.
  - Formulário de contato com assunto dedicado (dúvida, avaliação, compra, aluguel, venda, legalização) e placeholders contextuais por tipo de solicitação.
  - Política de privacidade (LGPD) e páginas de erro tratadas (404, erro interno, acesso não autorizado).

- **Painel Administrativo (Gestão Interna):**
  - Login com controle de acesso por papel (ADMIN/EDITOR) e proteção contra força bruta.
  - Dashboard com KPIs: valor total do portfólio, preço médio por finalidade (Venda, Aluguel, Temporada), distribuição de imóveis por tipo, finalidade e status (Disponíveis, Reservados, Alugados e Vendidos).
  - Listagem de imóveis com busca por código/título/endereço (com debounce), filtros avançados e paginação.
  - Cadastro via formulário multi-seção (dados do imóvel, localização com CEP automático via ViaCEP, terreno, cômodos, características, imagens), com flags de Destaque e Exclusivo.
  - Edição em fluxo de 2 passos (editar → revisar) com visualização das alterações antes de confirmar.
  - Upload e reordenação de imagens por drag-and-drop, definição de capa e remoção em lote.
  - Exclusão de imóvel com confirmação e limpeza automática das imagens no Cloudinary.

### Informações Técnicas

#### Front-end

**Next.js 16 / Typescript / React 19:** App Router + SSR (SEO Otimizado).  
**Tailwind CSS 4 / Shadcn**: Design system personalizado e componentes acessíveis.  
**React Hook Form / Zod**: formulários e validação compartilhada entre camadas.  

#### Back-end

**Supabase (PostgreSQL):** Gerenciamento de banco de dados Row Level Security ativo em todas as tabelas.  
**Supabase Auth:** Autenticação JWT, revalidação de tokens automática, controle de acesso por papel (RBAC).  
**Pino:** Logs estruturados.  
**Segurança:** Rate limit de login com bloqueio por IP e cookie assinado, HTTPS, CSP restrito.  

#### Integrações

**ViaCEP**: Consulta e preenchimento automático de endereço no cadastro do imóvel.  
**EmailJS**: Contato via e-mail sem SMTP dedicado e continuidade do atendimento sem dependência da plataforma.  
**Cloudinary**: upload, otimização/conversão automática para WebP/AVIF, deleção em lote e armazenamento de imagens.  

#### Infraestrutura & Deploy

- **Desenvolvimento:** Ferramentas self-hosted (VPS Hetzner + Coolify + Docker + Supabase) para iteração rápida e disponibilidade constante.
- **Produção:** build local da imagem Docker → push para Docker Hub → deploy via Docker Compose + Caddy (reverse proxy) em VPS dedicada, com Cloudflare para DNS/CDN sem custo mensal de serviços de terceiros (Supabase e Cloudinary em camada gratuita), carga de uso otimizada no servidor e versionamento de imagens facilitando rollback de versões.

### Desafios e Soluções

#### Upload, otimização e armazenamento de imagens sem custo

Solução: Integração com cloudinary configurado com upload presets e presets de transformação que otimizam e convertem dinamicamente os formatos da imagem, otimizando a entrega sem perder a qualidade da imagem com plano gratuito generoso e reset mensal de créditos.

#### Custo e performance de infraestrutura

Builds pesados de Next.js sobrecarregaram a RAM e CPU da VPS de produção quando feitos localmente no servidor via Coolify ou via Docker.

Solução: Separar o build do deploy. A imagem Docker é construída localmente e enviada ao Docker Hub em projeto privado, e a VPS apenas faz `pull` e sobe os containers via Docker Compose, eliminando o consumo de CPU/RAM de build em produção e rodando a aplicação de forma otimizada utilizando em torno de 90 MB de RAM.

#### Design Inclusivo, Responsivo e Redução de Atrito na Gestão

Solução: feedback dos clientes a cada Iteração para adequar a arquitetura da informação e abstração dos termos e regras de negócio para uma interface intuitiva e objetiva com retorno visual das ações. Abordagem mobile-first para garantir funcionamento em telas menores.

#### Arquitetura e padrões x IA

Solução: Uso do opencode para aceleração do desenvolvimento com agente orquestrador e sub-agentes (Frontend, Backend e Documentação) com regras, documentação de design tokens, stack, fluxos de funcionalidades e PRD, MCP context7 e LSP para Typescript, skills e instruções específicas criados para o projeto, documentação obrigatória a cada tarefa e revisões de código feita por mim.

### Impacto

Entregue como projeto solo, do design à infraestrutura, com escopo de 21 requisitos funcionais implementados, cobrindo site público, painel administrativo com RBAC e gestão completa do catálogo de imóveis.

| Frente                    | O que foi entregue                                                                                                                     |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Conversão de lead**     | Contato direto com a corretora em poucos cliques via WhatsApp, com mensagem pré-preenchida (código + título do imóvel) ou E-mail.      |
| **Facilidade de gestão**  | Painel administrativo simples e intuitivo, permitindo cadastro, edição e organização de imóveis por uma usuária sem perfil técnico.    |
| **Autonomia operacional** | Cliente gerencia todo o catálogo (cadastro, edição, destaques) sem suporte técnico.                                                    |
| **Segurança por padrão**  | RLS ativo em 100% das tabelas, RBAC com dois papéis e proteção contra força bruta no login.                                            |
| **Custo operacional**     | Zero custo mensal em serviços de terceiros (Supabase e Cloudinary em camada gratuita), único custo fixo é a VPS (Servidor contratado). |
| **Performance & SEO**     | SSR e metadados dinâmicos por página, imagens otimizadas via CDN (WebP/AVIF) e carregamento em streaming na homepage.                  |

### Showcase

#### Screenshots do Projeto

![Homepage da Plataforma Imobiliária](/images/projects/heloysa-maria/home.png) _Legenda: Área pública do site com destaque de imóveis, busca otimizada e design responsivo._

![Painel Administrativo - Dashboard](/images/projects/heloysa-maria/admin-dashboard.png) _Legenda: Painel de gestão administrativa com métricas do portfólio, controle de imóveis e indicadores._

#### Vídeo Demonstrativo

<div class="video-container"> <iframe src="https://www.youtube.com/embed/SEU_VIDEO_ID" title="Demonstração da Plataforma Imobiliária" frameborder="0" allowfullscreen></iframe> </div>
