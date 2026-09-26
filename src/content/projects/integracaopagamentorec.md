---
type: corporativo
title: Integração de Pagamentos Recorrentes com Pix Automático
description: Integração de pagamentos para suportar recorrências, eventos assíncronos e diferentes sistemas.
year: "2025-10-01"
yearEnd: "2026-03-01"
tags:
  - typescript
  - nodejs
  - fastify
  - postgresql
  - supabase
  - n8n
  - docker
  - webhooks
---

## Visão geral

Este projeto surgiu durante minha atuação em uma equipe de Transformação Digital, a partir da evolução de automações utilizadas nos processos de cadastro e pagamento da empresa.

Minha participação começou com a manutenção e melhoria de fluxos existentes. Conforme banco de dados, ERP, novos sistemas internos e pagamentos recorrentes passaram a fazer parte do processo, a integração precisou evoluir para lidar com mais estados, dependências e eventos assíncronos.

Minha atuação se concentrou principalmente no backend e na comunicação entre esses sistemas, trabalhando com Node.js/Fastify, n8n e PostgreSQL/Supabase para estruturar a camada de integração.

O desafio central foi permitir que diferentes aplicações participassem do mesmo processo mantendo informações, estados e relacionamentos coerentes ao longo do tempo.

> Este é um projeto corporativo. Informações foram anonimizadas e detalhes internos foram abstraídos. O objetivo deste estudo de caso é apresentar minha atuação e as decisões técnicas envolvidas sem reproduzir a implementação da organização.

## Navegação do case

**01 · [Contexto](#contexto)**  
Dos primeiros fluxos de pagamento à necessidade de uma integração mais estruturada.

**02 · [Evolução da solução](#evolução-da-solução)**  
Como mudanças nos sistemas levaram à reformulação técnica.

**03 · [Meu papel](#meu-papel)**  
Responsabilidades, iniciativa e colaboração.

**04 · [Desafios técnicos e soluções](#desafios-técnicos-e-soluções)**  
Eventos assíncronos, correlação, estado e processamento.

**05 · [Arquitetura](#arquitetura)**  
API, automação e dados separados por responsabilidade.

**06 · [Documentação técnica](#documentação-técnica)**  
Como os demais sistemas utilizavam a integração.

**07 · [Infraestrutura](#infraestrutura)**  
Publicação e manutenção dos componentes.

**08 · [Resultado](#resultado)**  
O que a integração passou a permitir.

---

## Contexto

Quando comecei a atuar nessas integrações, já existia uma base de automação utilizada em processos de cadastro, atendimento e pagamento.

Ferramentas como Typebot e n8n eram utilizadas para coletar informações, conduzir partes do atendimento, encaminhar clientes para pagamento e integrar os dados resultantes ao CRM utilizado naquele momento.

Minha atuação inicial foi dar continuidade a esses fluxos aproveitando minha experiência operacional. Finalizei e adaptei automações existentes, configurei integrações necessárias para novos produtos e reorganizei partes dos workflows para reduzir repetições e facilitar sua manutenção. Depois, passei a modificá-los e criar novas automações conforme as necessidades surgiam.

Nesse primeiro cenário, os processos eram relativamente lineares: receber informações, acompanhar uma etapa de pagamento e encaminhar os dados necessários para os sistemas seguintes.

Essa experiência serviu como base para compreender como as informações circulavam entre as diferentes aplicações antes que o cenário se tornasse mais complexo.

---

## Evolução da solução

Conforme o ambiente evoluiu, um ERP foi incorporado ao processo, enquanto outros sistemas eram substituídos ou desenvolvidos em paralelo. Com a introdução do Pix Automático, aumentou também a necessidade de organizar como essas aplicações se relacionariam e quais informações precisariam circular entre elas.

A partir das novas necessidades e definições discutidas com a liderança e as áreas envolvidas, propus e estruturei uma visão técnica comum para a integração, organizando responsabilidades e pontos de comunicação entre os sistemas. Essa proposta passou a apoiar a evolução da camada de integração, incluindo os workflows, a modelagem de dados, ERP, os contratos entre aplicações e a criação de uma API.

---

## Meu papel

A responsabilidade principal passou a estar no backend da integração, automações e na comunicação entre os diferentes sistemas.

Minha atuação estava principalmente em construir e organizar a camada que permitiria que as aplicações internas e o site comercial se comunicassem com os serviços, dados e sistemas envolvidos no processo.

Ao longo do projeto:

- Desenvolvi uma API em Node.js/Fastify;
- Evoluí e criei workflows de integração no n8n;
- Trabalhei com eventos assíncronos, webhooks e processamento posterior;
- Participei da reformulação da modelagem em PostgreSQL/Supabase;
- Defini e documentei contratos utilizados pelas aplicações da equipe;
- Utilizei Postman para desenvolvimento e validação das APIs;
- Trabalhei nas integrações com o ERP, CRM, banco de dados e demais sistemas;
- Participei da publicação e manutenção das aplicações relacionadas à integração.

Também participei de discussões com áreas não técnicas. Algumas precisavam compreender o funcionamento essencial do pix automático para orientar clientes, enquanto outras necessitavam de maior profundidade sobre estados de pagamento, liquidação, acompanhamento e conciliação, inclusive em situações nas quais a pessoa vinculada ao produto não era necessariamente a mesma responsável pelo pagamento.

Parte dessas necessidades foi traduzida em regras da integração e nas informações que precisavam estar disponíveis para os sistemas internos.

### Trabalho colaborativo

No entendimento do negócio, contei com o apoio do gerente de projetos, que contribuiu nas discussões sobre regras, necessidades e soluções, além de apoiar a forma como essas informações seriam apresentadas às demais áreas.

Na modelagem dos dados, contei com o apoio de um colega com experiência anterior como Analista de Banco de Dados. Ele participou das discussões sobre a estrutura do banco e me apresentou conceitos que passei a aplicar aos relacionamentos e regras identificados durante o desenvolvimento.

Também contribuí para a organização do trabalho da equipe por meio da documentação de processos, estruturação de tarefas e adoção de práticas de trabalho baseadas em Kanban.

---

## Desafios técnicos e soluções

### Relacionar operações de um mesmo processo

Os primeiros fluxos de pagamento com os quais trabalhei eram relativamente lineares. Com pagamentos recorrentes, uma mesma jornada passou a envolver diferentes operações e mudanças de estado que podiam acontecer em momentos distintos.

Para o negócio, recorrências e suas cobranças faziam parte de um mesmo processo. Tecnicamente, porém, algumas dessas operações eram representadas separadamente pelo serviço externo.

Implementei uma estratégia de correlação para preservar essas relações e reconstruir o contexto da jornada antes de disponibilizar as informações aos demais sistemas.

Isso exigiu combinar informações provenientes dos serviços externos, permitindo centralizar essa complexidade na camada de integração.

### Diferenciar cliente e responsável pelo pagamento

Nem sempre a pessoa vinculada ao produto era a mesma responsável pelo pagamento.

Nos fluxos anteriores, essa informação podia ser obtida durante o atendimento. Com a evolução da solução, esse relacionamento passou a precisar ser tratado pela própria integração.

Na camada de integração, passei a tratar as informações necessárias para identificar e associar cliente e pagador, organizando os dados conforme as regras e necessidades do negócio.

Além de preservar o contexto correto das operações, essa distinção era importante para o acompanhamento e a conciliação financeira.

### Separar recebimento e processamento

Alguns eventos exigiam consultas, correlação de informações e ações em outros sistemas. Executar todas essas responsabilidades durante o recebimento das notificações aumentaria o acoplamento dos fluxos e dificultaria o tratamento de falhas.

Por isso, estruturei um processamento assíncrono baseado em uma fila persistida no banco de dados. As notificações eram classificadas e registradas para processamento posterior, enquanto workflows especializados assumiam as tarefas de acordo com o contexto de cada evento.

Também implementei controle de estado e reserva das tarefas durante o processamento, permitindo identificar operações concluídas, falhas e situações que deveriam ser processadas novamente.

Essa separação desacoplou o recebimento das regras posteriores e tornou possível acompanhar e reprocessar as operações sem concentrar toda a lógica no fluxo de entrada.

### Disponibilizar histórico para acompanhamento financeiro

A área Financeira precisava consultar informações históricas das operações de pagamento de forma consolidada, além do estado atual disponível nos sistemas.

Para atender essa necessidade, desenvolvi consultas na API responsáveis por reunir, tratar e organizar as informações necessárias antes de disponibilizá-las aos sistemas internos.

Essas consultas passaram a oferecer uma visão histórica adequada às atividades de conferência e acompanhamento financeiro, sem transferir para as aplicações consumidoras a complexidade de interpretar e relacionar os dados de origem.

A mesma estrutura de histórico também fornecia contexto para outros processos da integração que dependiam da evolução das operações ao longo do tempo.

---

## Arquitetura

A solução foi organizada principalmente em torno de três responsabilidades:

**Dados, processos e aplicações consumidoras.**

A API em Fastify concentrava consultas, tratamento e organização das informações, disponibilizando aos sistemas internos dados adequados ao contexto de cada operação.

O n8n atuava principalmente na orquestração dos processos, no tratamento dos eventos recebidos e na coordenação das integrações com outros sistemas.

O PostgreSQL/Supabase mantinha o estado e os relacionamentos necessários para preservar o contexto das informações ao longo dos processos.

As aplicações consumidoras utilizavam os dados disponibilizados pela camada de integração para implementar as funcionalidades específicas de cada área.

Essa organização manteve responsabilidades distintas entre tratamento de dados, coordenação de processos e aplicações consumidoras.

<!-- Inserir aqui apenas uma versão pública e simplificada do diagrama. -->

---

## Documentação técnica

Como diferentes aplicações eram desenvolvidas em paralelo, documentei contratos de integração para servir como referência aos demais membros da equipe e manter a comunicação entre os sistemas consistente durante a evolução da solução.

Durante o desenvolvimento, utilizei o Postman para organizar requisições, reproduzir cenários e validar o comportamento da API e dos contratos. A documentação era atualizada conforme as integrações e requisitos evoluíam.

---

## Infraestrutura

Além do desenvolvimento das integrações, também participei da publicação e operação das aplicações em ambiente self-hosted.

Utilizei Docker e Docker Compose para containerização dos serviços e Coolify para gerenciamento e deploy em VPS, incluindo componentes como a API e serviços utilizados pelas automações.

Também contribuí para a documentação desse processo de publicação, buscando tornar a manutenção das aplicações mais consistente para a realidade da equipe.

---

## Resultado

A integração evoluiu para uma camada capaz de conectar diferentes sistemas e centralizar parte da complexidade das jornadas de pagamentos recorrentes, evitando que cada aplicação precisasse interpretar individualmente as particularidades dos serviços externos.

A solução passou a fornecer informações tratadas para os sistemas internos, manter o histórico necessário ao acompanhamento das operações e apoiar necessidades de outras áreas envolvidas no processo.

O projeto também ampliou minha experiência com integração de sistemas, processamento assíncrono, modelagem de dados e desenvolvimento orientado por necessidades do negócio.
