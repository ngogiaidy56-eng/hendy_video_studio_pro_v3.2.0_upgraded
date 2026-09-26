# Cloudflare Build Fix — 2026-09-27

## Failure
Cloudflare Bun build failed during dependency resolution with:

`No version matching "^4.20260920.0" found for specifier "@cloudflare/workers-types"`

## Fix
`worker/package.json` now pins the published Workers Types release:

```json
"@cloudflare/workers-types": "5.20260926.1"
```

The same version is reflected in `SYSTEM_SOT_SOURCE_CODE.md`.

Cloudflare introduced `@cloudflare/workers-types` v5 in July 2026 and recommends `wrangler types` for configuration-specific runtime types. The package remains published and the verified registry release used here is `5.20260926.1`.

## Rebuild
Cloudflare Pages / Workers can continue to use its detected Bun environment:

```bash
bun install
bun run config:validate
bun run config:sync
bun run typecheck
bun run build
```

No real secrets are stored in the repository. Put production values in Cloudflare/GitHub secrets or local `.env` files.
