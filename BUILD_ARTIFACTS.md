# Build artifacts

This source package is the corrected Hendy Video Studio Pro v2.4.0 monorepo.

Cloudflare dependency fix:
- `@cloudflare/workers-types` pinned to `5.20260926.1`
- root `packageManager` pinned to `bun@1.2.15`
- generated SOT targets refreshed

Validation performed in the packaging environment:
- SOT validation: PASS
- SOT sync: PASS
- stale `4.20260920.0` reference scan: PASS
- JavaScript/MJS syntax checks: PASS (see packaging log)

A full dependency install was not available in the packaging container because Bun/npm dependency downloads timed out. The Cloudflare failure itself is fixed by the verified package-version correction.
