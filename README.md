# Astro Starter Kit: Basics

```sh
yarn create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `yarn install`             | Installs dependencies                            |
| `yarn dev`             | Starts local dev server at `localhost:4321`      |
| `yarn build`           | Build your production site to `./dist/`          |
| `yarn preview`         | Preview your build locally, before deploying     |
| `yarn astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `yarn astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Comentários (Vercel + Make)

O site permanece estático; apenas as rotas de comentários usam funções da
Vercel. Configure estas variáveis **privadas** no ambiente de desenvolvimento e
nos ambientes de deploy necessários, sem o prefixo `PUBLIC_`:

| Variável | Finalidade |
| --- | --- |
| `COMMENTS_WEBHOOK_URL` | Webhook de envio dos comentários no Make. |
| `GET_COMMENTS_WEBHOOK_URL` | Webhook de listagem no Make. |
| `COMMENTS_INVALIDATION_TOKEN` | Segredo aleatório compartilhado com o nó HTTP do Make. |

Após o Make **confirmar uma mudança efetiva de status** (inclusive de aprovado
para reprovado), configure um nó HTTP. Se os links forem clicados novamente sem
alterar o status, não é necessário disparar a notificação:

- Método: `POST`.
- URL: `https://vitorhugodev.com/api/commentsInvalidate.json`.
- Header: `Authorization: Bearer <segredo configurado>`.
- Corpo: vazio; não envie nome, identificador nem dados do comentário.
- Resultado esperado: `204`. Em caso de erro, verifique a execução no Make.

Essa chamada apaga a lista da CDN, **sem consultar o Make**. A próxima visita à
página de comentários repõe o cache; comentários ainda pendentes não precisam
de invalidação. O cache da CDN é regional e pode ocasionalmente perder a entrada
sem uma mudança nos dados. Ao remover um comentário publicado, primeiro marque-o
como reprovado, confirme a atualização da lista pública e só depois exclua-o
manualmente do Make e do Discord.

Depois da migração, remova as antigas URLs `PUBLIC_*` dos ambientes e substitua
os webhooks que já foram expostos em versões anteriores do site. Nunca publique
o segredo de invalidação nem as URLs privadas em código de cliente.

O POST de comentários é público: validação e honeypot reduzem erros comuns, mas
não impedem abuso automatizado. Configure no painel da Vercel uma regra de
limitação para `POST /api/comments.json` antes de disponibilizá-lo amplamente;
sem limitação distribuída, chamadas maliciosas podem consumir créditos do Make.

Para verificar tipos com Yarn 1 use `yarn run check` (o comando `yarn check`
executa o verificador de dependências do próprio Yarn). Rode também `yarn lint`
e `yarn build` antes do deploy; confira o cache no ambiente da Vercel, pois o
servidor de desenvolvimento não reproduz o comportamento da CDN.

## Licença

O código-fonte deste projeto é disponibilizado sob a [licença MIT](LICENSE),
salvo quando indicado de outra forma.

Textos, imagens, identidade visual, design, informações pessoais, depoimentos e
demais conteúdos autorais presentes no portfólio não estão incluídos na licença
MIT e permanecem protegidos pelos direitos autorais de seus respectivos titulares.

Conteúdos, bibliotecas, marcas, imagens e outros materiais pertencentes a terceiros
permanecem sujeitos às respectivas licenças e condições de uso.
