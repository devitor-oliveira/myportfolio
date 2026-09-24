# AGENTS.md

Personal portfolio site ("Portifólio | Vitor Dev"), Astro 6 + React 19 islands + Tailwind v4. All UI text, content, and commit messages are in Brazilian Portuguese (pt-BR) — keep it that way. Site: `https://vitorhugodev.com`.

## Commands (yarn only; Node >= 22.12)

- `yarn dev` — dev server at `localhost:4321`
- `yarn check` — typecheck (`astro check`), distinct from lint
- `yarn lint` / `yarn lint:fix` — `biome lint` (covers `.astro` too)
- `yarn format` — `biome format --write .`
- `yarn build` / `yarn preview`
- No test suite and no CI — verify changes with `yarn check` then `yarn lint`.

## Formatting & lint (Biome, non-default)

- Tabs, single quotes, lineWidth 80; `organizeImports` assist is on (keep imports sorted).
- Type-only imports MUST use `import type` (biome `useImportType` is error).

## Architecture

- `src/content.config.ts` + `src/content/{blog,projects}/*.md` — content collections (glob loader, Zod schemas). New post/project = add markdown matching the schema (`type` enum: `personal|professional|open-source|freelance`; `year` is a coerced date). `/blog/` and `/projects/` slugs come from `getStaticPaths`.
- `src/pages/api/*.json.ts` — on-demand endpoints (`terminalData`, `commentsData`); consumed by `src/lib/commands.ts` and hooks.
- `src/components/ui/*.tsx` — shadcn/ui (radix-vega). Feature components live in PascalCase dirs (`index.tsx` / `.astro` siblings).
- `src/lib/*` — site copy (`siteContent.ts`), terminal command registry (`commands.ts`), `cn()` + pt-BR `formatDate()` (`utils.ts`). Alias `@/*` → `src/*`.
- `src/hooks/*` — React hooks; `useGetComments` uses SWR with a localStorage cache; `useAboutComments` POSTs to a Make.com webhook.
- Interactive behavior is opt-in: React components need Astro `client:*` directives to hydrate.

## Gotchas

- Webhooks live in `.env` (`PUBLIC_COMMENTS_WEBHOOK_URL`, `PUBLIC_GET_COMMENTS_WEBHOOK_URL`), gitignored; comment features rely on them but degrade gracefully to empty data.
- Tailwind v4 has NO `tailwind.config.js` — theme is defined in `src/styles/global.css` (`@theme`, `@plugin`, `@utility`, `@custom-variant`). Use existing tokens (`surface`/`neutral`/`brand` palettes, `font-display`/`font-body`/`font-detail`).
- Icons: astro-icon + `@iconify-json/mdi` → `<Icon name="mdi:..."/>` in `.astro`; `@iconify/react` in TSX.
- `.astro/` and `dist/` are generated — never edit.
- Add new shadcn components with `yarn shadcn add <name>`.
