# Cloudflare Build/Deploy Fix — 2026-09-27

## Dependency resolution
The previous Workers Types error was fixed by pinning `@cloudflare/workers-types` to `5.20260926.1`.

## Current deployment error
The build/install stage now succeeds. The remaining failure is caused by running `npx wrangler deploy` from the monorepo root while Wrangler cannot identify the intended application.

The repository now includes a root `wrangler.jsonc` targeting `worker/src/index.ts`, plus:
- `bun run deploy` → `wrangler deploy --config wrangler.jsonc`
- `bun run worker:deploy` → deploy the Worker using its workspace config.

## Cloudflare Workers settings
Use:
`Build command: bun run build`
`Deploy command: bun run deploy`

Do not use `npm install` as the user build command because Cloudflare already ran `bun install`.

## Cloudflare Pages
Deploy the React editor separately:
- Root directory: `frontend`
- Build command: `bun run build`
- Output directory: `dist`

No production secrets are committed.
