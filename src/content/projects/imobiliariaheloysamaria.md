---
type: freelance
title: Plataforma Imobiliária Heloysa Maria
description: Plataforma web para divulgação e gestão de imóveis, com portal público, painel administrativo e foco em autonomia operacional e SEO.
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

A plataforma foi desenvolvida para atender dois públicos: pessoas procurando imóveis e a profissional responsável por gerenciar o catálogo.

Na área pública, o objetivo foi facilitar a descoberta dos imóveis e o contato com a corretora. No painel administrativo, a proposta foi simplificar o cadastro, edição e organização do catálogo, reduzindo a necessidade de intervenção técnica nas tarefas do dia a dia.

### Meu Papel

Fui responsável pelo desenvolvimento técnico do projeto de ponta a ponta, incluindo arquitetura, interface, frontend, backend, banco de dados, integrações, infraestrutura e deploy.

Os requisitos e feedbacks da cliente foram intermediados pelo responsável pelo contato. A partir dessas informações, transformei as necessidades levantadas em fluxos, interfaces e funcionalidades da aplicação.

- **Interface:** criação e adaptação dos fluxos e componentes com base nos requisitos e feedbacks recebidos.
- **Desenvolvimento:** implementação do frontend, backend, banco de dados, autenticação e integrações.
- **Infraestrutura:** definição do ambiente de execução, containerização e publicação da aplicação em produção.

### Solução

A solução foi dividida em duas áreas principais: um portal público para descoberta e apresentação dos imóveis e um painel administrativo para gerenciamento do catálogo.

Os dois fluxos compartilham a mesma base de dados, mas possuem necessidades e níveis de acesso distintos.

A área pública foi estruturada para facilitar a navegação em diferentes dispositivos, a descoberta dos imóveis, principalmente destacados e exclusivos, e o contato com a corretora.

A área administrativa concentra as informações e operações necessárias para gerenciar o catálogo e os conteúdos exibidos no site.

### Funcionalidades

#### Área Pública

- Catálogo de imóveis com filtros e ordenação.
- Página individual de cada imóvel.
- Galeria de imagens.
- Contato por WhatsApp e formulário.
- SEO por imóvel.
- Interface Responsiva.

#### Painel Administrativo

- Autenticação e controle de acesso por perfil.
- Dashboard com indicadores do catálogo de imóveis.
- Cadastro, edição e exclusão de imóveis.
- Busca, filtros e paginação.
- formulários com validação.
- Fluxo de revisão antes de alterações importantes.
- Upload, ordenação, seleção de capa e remoção de imagens.

### Desafios e Soluções

#### Upload, otimização e armazenamento de imagens sem custo

A plataforma precisava lidar com armazenamento e otimização de pelo menos 30 imagens por imóvel em um cenário de recursos limitados, sem adicionar complexidade extra ao projeto.

Solução: Integração com cloudinary configurado com upload presets e presets de transformação que otimizam e convertem dinamicamente os formatos da imagem, otimizando a entrega mantendo qualidade adequada.

#### Custo e performance de infraestrutura

Builds pesados de Next.js sobrecarregaram a RAM e CPU da VPS de produção quando feitos localmente no servidor via Coolify ou via Docker.

Solução: Separar o build do deploy. O build é publicado com imagem versionada em repositório privado e executado no ambiente de produção. O container, no ambiente observado, utiliza aproximadamente em torno de 90 MB de RAM em execução.

#### Painel utilizado por uma pessoa sem perfil técnico

Solução: feedback da cliente por intermédio do responsável a cada iteração para adequar regras de domínio e negócio, organização dos fluxos de cadastro e edição, terminologia simplificada,  retorno e confirmação visual das ações.

### Informações Técnicas

### Front-end

**Next.js, React e TypeScript**  
Interface pública e painel administrativo com renderização SSR adequada à indexação e organização baseada no App Router.

**Tailwind CSS e Shadcn**  
Estruturação visual, padronização da interface, agilidade de estilização.

**React Hook Form + Zod**  
Gerenciamento e validação de formulários, compartilhamento de validação entre camadas.

### Back-end

**Supabase (PostgreSQL)**  
Gerenciamento de banco de dados, RLS e facilidade na migração das configurações aplicando migrations.  

**Supabase Auth**  
Autenticação, políticas de acesso, validação e revalidação de sessão e login.

**Pino**  
Logs estruturados para debug no desenvolvimento e identificação de erros em produção.  

**Segurança**  
Rate limit de login com bloqueio temporário por IP, RLS aplicado às tabelas, HTTPS.  

### Integrações

**ViaCEP**  
Consulta de endereço por CEP no cadastro do imóvel.  

**EmailJS**  
Contato via e-mail sem SMTP dedicado e continuidade do atendimento sem dependência da plataforma imobiliária.  

**Cloudinary**  
Upload, otimização e transformação e armazenamento de imagens sem custos adicionais dentro do plano gratuito com transição simples, caso seja necessário futuramente.  

### Infraestrutura & Deploy

- Aplicação containerizada e executada em VPS.
- Ambientes de desenvolvimento e produção separados.
- Build realizado fora do ambiente de produção e publicado como imagem versionada em repositório privado.

### Impacto

Entregue do design à infraestrutura, com escopo cobrindo site público, painel administrativo com RBAC e gestão completa do catálogo de imóveis.

| Necessidade | O que foi entregue |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Contato facilitado** | Contato direto com a corretora em poucos cliques via WhatsApp, com mensagem contextualizada ou E-mail. |
| **Autonomia operacional** | As principais operações do catálogo podem ser realizadas diretamente pelo painel administrativo. |
| **Controle de Acesso** | RLS ativo em 100% das tabelas, RBAC com dois papéis e proteção contra força bruta no login. |
| **Custo operacional** | Os serviços auxiliares foram mantidos dentro das camadas gratuitas e os custos recorrentes foram concentrados na infraestrutura principal. |
| **SEO e Conteúdo** | SSR e metadados dinâmicos por página, imagens otimizadas |

### Showcase

#### Screenshots do Projeto

![Homepage da Plataforma Imobiliária](/images/projects/heloysa-maria/home.png) _Legenda: Área pública do site com destaque de imóveis, busca otimizada e design responsivo._

![Painel Administrativo - Dashboard](/images/projects/heloysa-maria/admin-dashboard.png) _Legenda: Painel de gestão administrativa com métricas do portfólio, controle de imóveis e indicadores._

#### Vídeo Demonstrativo

<div class="video-container"> <iframe src="https://www.youtube.com/embed/SEU_VIDEO_ID" title="Demonstração da Plataforma Imobiliária" frameborder="0" allowfullscreen></iframe> </div>
