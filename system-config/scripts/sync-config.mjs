import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('../..', import.meta.url).pathname);
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'system-config/system.config.json'), 'utf8'));

const kebab = (s) => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
const out = path.join(root, 'frontend/src/generated');
fs.mkdirSync(out, {recursive: true});

fs.writeFileSync(path.join(out, 'system-config.ts'),
`export const SYSTEM_CONFIG = ${JSON.stringify(cfg, null, 2)} as const;\n`);

fs.writeFileSync(path.join(out, 'system-env.ts'),
`export type RuntimeEnv = { API_BASE_URL?: string; TELEGRAM_BOT_USERNAME?: string };\nexport const runtimeEnv: RuntimeEnv = {\n  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,\n  TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME\n};\n`);

const css = Object.entries(cfg.theme).map(([k,v]) => `  --${kebab(k)}: ${v};`).join('\n');
fs.writeFileSync(path.join(out, 'system-theme.css'), `:root {\n${css}\n}\n`);

fs.writeFileSync(path.join(out, 'system-layout.tsx'),
`import type { ReactNode } from 'react';\nexport function SystemLayout({children}:{children:ReactNode}) {\n  return <div className="system-layout"><main className="system-main">{children}</main><nav className="bottom-action-dock" aria-label="Editor actions"><button>Timeline</button><button>Assets</button><button>Audio</button><button>Export</button></nav></div>;\n}\n`);

const manifest = {
  name: cfg.system.name,
  short_name: 'AI Studio Pro',
  start_url: '/', display: 'standalone',
  background_color: cfg.theme.darkBackgroundColor,
  theme_color: cfg.theme.darkBackgroundColor,
  icons: [{src:'/logo192.png',sizes:'192x192',type:'image/png'},{src:'/logo512.png',sizes:'512x512',type:'image/png'}]
};
fs.writeFileSync(path.join(root, 'frontend/public/manifest.json'), JSON.stringify(manifest, null, 2));

fs.writeFileSync(path.join(root, 'frontend/index.html'),
`<!doctype html><html lang="vi"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><title>${cfg.system.name}</title><meta name="theme-color" content="${cfg.theme.darkBackgroundColor}"/><script src="https://telegram.org/js/telegram-web-app.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>`);

fs.writeFileSync(path.join(root, 'worker/wrangler.jsonc'), JSON.stringify({name:'hendy-video-studio-pro-api',main:'src/index.ts',compatibility_date:'2026-09-27',vars:{API_BASE_PATH:cfg.network.apiBasePath}}, null, 2));
console.log(`SOT synced to ${cfg.managedFiles.length} managed targets.`);
