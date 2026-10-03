import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import crypto from 'node:crypto';

function findRoot(start){ let dir=path.resolve(start); while(true){ const candidate=path.join(dir,'system-config','system.config.json'); if(fsSync.existsSync(candidate)) return dir; const parent=path.dirname(dir); if(parent===dir) throw new Error('Cannot locate repository root from '+start); dir=parent; } }
const ROOT = findRoot(process.cwd());
const SOT = path.join(ROOT, 'system-config', 'system.config.json');
const args = new Set(process.argv.slice(2));

const stableJson = value => JSON.stringify(value, null, 2) + '\n';
const hash = text => crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);
const deepClone = value => JSON.parse(JSON.stringify(value));

function validate(c) {
  const errors = [];
  const need = (ok, msg) => { if (!ok) errors.push(msg); };
  need(/^\d+\.\d+\.\d+$/.test(String(c?.app?.version ?? '')), 'app.version must be semver');
  need(Number.isInteger(c?.runtime?.sandbox?.port) && c.runtime.sandbox.port >= 1024 && c.runtime.sandbox.port <= 65535, 'sandbox port invalid');
  need(Number.isInteger(c?.runtime?.dev?.vitePort) && c.runtime.dev.vitePort >= 1024 && c.runtime.dev.vitePort <= 65535, 'vite port invalid');
  need(c?.runtime?.sandbox?.publicAccess === false, 'sandbox publicAccess must be false');
  need(c?.storage?.publicAccess === false, 'R2 publicAccess must be false');
  need(/^https:\/\/.+\.r2\.cloudflarestorage\.com$/.test(String(c?.storage?.endpoint ?? '')), 'R2 endpoint invalid');
  need(/^https:\/\//.test(String(c?.runtime?.cloudflare?.publicAppUrl ?? '')), 'publicAppUrl must be https');
  const workers = c?.runtime?.cloudflare?.workers ?? {};
  const names = Object.entries(workers).map(([key, target]) => [key, target?.workerName]);
  need(names.length === 4 && new Set(names.map(x => x[1])).size === 4, 'four dedicated Worker names must be unique');
  need(c?.runtime?.cloudflare?.gateway?.workerName === 'hendy-video-studio-pro', 'gateway worker name must be hendy-video-studio-pro');
  need(c?.security?.requiredSecrets?.backend?.length >= 4, 'backend required secrets incomplete');
  return errors;
}

function autoPatch(input) {
  const c = deepClone(input);
  const patches = [];
  const patch = (p, next) => {
    const parts = p.split('.');
    let ref = c;
    while (parts.length > 1) ref = ref[parts.shift()] ??= {};
    const leaf = parts[0];
    if (ref[leaf] !== next) { patches.push(`${p}: ${JSON.stringify(ref[leaf])} -> ${JSON.stringify(next)}`); ref[leaf] = next; }
  };
  if (!/^\d+\.\d+\.\d+$/.test(String(c.app?.version ?? ''))) patch('app.version', '3.2.0');
  if (!(Number.isInteger(c.runtime?.sandbox?.port) && c.runtime.sandbox.port >= 1024 && c.runtime.sandbox.port <= 65535)) patch('runtime.sandbox.port', 8799);
  if (!(Number.isInteger(c.runtime?.dev?.vitePort) && c.runtime.dev.vitePort >= 1024 && c.runtime.dev.vitePort <= 65535)) patch('runtime.dev.vitePort', 5173);
  patch('runtime.sandbox.publicAccess', false);
  patch('storage.publicAccess', false);
  patch('sync.releaseGate', 'NOMINAL');
  return {out:c, patches};
}

function packageRoot(c) {
  return {
    name: 'hendy-video-studio-pro', private: true, version: c.app.version, type: 'module',
    workspaces: ['system-config','backend','worker','frontend','example_bot','mcp/cloudflare'],
    scripts: {
      'config:validate':'node system-config/scripts/validate-config.mjs',
      'config:sync':'node system-config/scripts/sync-config.mjs --sync',
      'config:dry-run':'node system-config/scripts/sync-config.mjs --dry-run',
      'config:auto-patch':'node system-config/scripts/sync-config.mjs --auto-patch',
      'dev':'npm run config:sync && tsx server.ts',
      'build':'npm run config:validate && npm run config:sync && npm --workspace frontend run build',
      'build:all':'npm run release:gate',
      'start':'tsx server.ts',
      'typecheck':'npm run typecheck:frontend && npm run typecheck:backend && npm run typecheck:worker && npm run typecheck:mcp && npm run typecheck:telegram',
      'typecheck:frontend':'npm --workspace frontend run typecheck',
      'typecheck:backend':'npm --workspace backend run typecheck',
      'typecheck:worker':'npm --workspace worker run typecheck',
      'typecheck:mcp':'npm --workspace mcp/cloudflare run typecheck',
      'typecheck:telegram':'npm --workspace example_bot run typecheck',
      'sandbox':'node system-config/sandbox/server.mjs',
      'release:gate':'npm run config:validate && npm run config:sync && npm run typecheck && npm --workspace frontend run build && npm --workspace backend run build && npm --workspace worker run build && npm --workspace mcp/cloudflare run build && npm --workspace example_bot run build',
      'worker:deploy':'node system-config/scripts/deploy-all.mjs',
      'deploy':'node system-config/scripts/deploy-all.mjs',
      'deploy:all':'node system-config/scripts/deploy-all.mjs',
      'production:check':'node system-config/scripts/production-check.mjs'
    },
    dependencies: { 'cors':'^2.8.5', 'dotenv':'^17.2.2', 'express':'^5.1.0', 'ws':'^8.22.0' },
    devDependencies: { '@types/cors':'^2.8.19', '@types/express':'^5.0.3', '@types/node':'^24.4.0', '@types/ws':'^8.18.1', 'tsx':'^4.20.5', 'typescript':`^${c.toolchain.typescript}`, 'vite':'^7.3.6' },
    engines:{node:c.toolchain.node}, packageManager:`bun@${c.toolchain.bun}`
  };
}

function capacitor(c) {
  return `import type { CapacitorConfig } from '@capacitor/cli';\n\nconst config: CapacitorConfig = {\n  appId: ${JSON.stringify(c.platforms.android.packageId)},\n  appName: ${JSON.stringify(c.app.name)},\n  webDir: 'dist',\n  bundledWebRuntime: false,\n  server: { androidScheme: 'https', iosScheme: 'https' }\n};\n\nexport default config;\n`;
}

function manifest(c) {
  return stableJson({name:c.app.name,short_name:c.app.shortName,description:c.app.description,lang:c.app.language,start_url:c.platforms.pwa.startUrl,scope:'/',display:c.platforms.pwa.display,orientation:'any',theme_color:c.platforms.pwa.themeColor,background_color:c.platforms.pwa.backgroundColor,icons:[{src:'/logo192.png',sizes:'192x192',type:'image/png'},{src:'/logo512.png',sizes:'512x512',type:'image/png'}]});
}

function headers(c) {
  return `/* ${c.app.name} ${c.app.version} */\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: microphone=(self), camera=(self)\n  Content-Security-Policy: default-src 'self'; script-src 'self' https://telegram.org; connect-src 'self' https://*.workers.dev wss:; img-src 'self' data: blob: https:; media-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; worker-src 'self' blob:; frame-src https://t.me; object-src 'none'; base-uri 'self'\n\n/manifest.json\n  Content-Type: application/manifest+json\n  Cache-Control: public, max-age=300\n\n/sw.js\n  Cache-Control: no-cache\n`;
}

function rootWrangler(c) {
  const g = c.runtime.cloudflare.gateway;
  return stableJson({$schema:'./node_modules/wrangler/config-schema.json',name:g.workerName,main:g.main,compatibility_date:c.runtime.cloudflare.compatibilityDate,assets:{directory:g.assetsDirectory,binding:'ASSETS',not_found_handling:'single-page-application',run_worker_first:['/api/*','/mcp','/mcp/*','/telegram/*']},services:[{binding:'BACKEND',service:c.runtime.cloudflare.workers.backend.workerName},{binding:'AI_EDGE',service:c.runtime.cloudflare.workers.ai.workerName},{binding:'MCP',service:c.runtime.cloudflare.workers.mcp.workerName},{binding:'TELEGRAM',service:c.runtime.cloudflare.workers.telegram.workerName}]});
}

function backendWrangler(c) {
  const w=c.runtime.cloudflare.workers.backend;
  return stableJson({$schema:'../node_modules/wrangler/config-schema.json',name:w.workerName,main:'src/worker.ts',compatibility_date:c.runtime.cloudflare.compatibilityDate,compatibility_flags:['nodejs_compat'],vars:{APP_VERSION:c.app.version,FRONTEND_ORIGIN:c.runtime.cloudflare.publicAppUrl,PUBLIC_APP_URL:c.runtime.cloudflare.publicAppUrl,R2_BUCKET:c.storage.bucketName,R2_ACCOUNT_ID:c.storage.accountId,R2_ENDPOINT:c.storage.endpoint,MAX_AI_UPLOAD_BYTES:String(c.api.maxUploadBytes),TELEGRAM_OTP_TTL_SECONDS:String(c.security.otpTtlSeconds)},secrets:{required:c.security.requiredSecrets.backend},dev:{port:8787}});
}

function aiWrangler(c) {
  const w=c.runtime.cloudflare.workers.ai;
  return stableJson({$schema:'../node_modules/wrangler/config-schema.json',name:w.workerName,main:'src/index.ts',compatibility_date:c.runtime.cloudflare.compatibilityDate,vars:{APP_VERSION:c.app.version,API_BASE_PATH:c.api.basePath,CLOUDFLARE_TTS_MODEL:c.ai.cloudflareTtsModel},ai:{binding:'AI'},dev:{port:8788}});
}

function mcpWrangler(c) {
  const w=c.runtime.cloudflare.workers.mcp;
  return stableJson({$schema:'../../node_modules/wrangler/config-schema.json',name:w.workerName,main:'src/worker.ts',compatibility_date:c.runtime.cloudflare.compatibilityDate,vars:{APP_VERSION:c.app.version,PUBLIC_APP_URL:c.runtime.cloudflare.publicAppUrl},dev:{port:8790}});
}

function botWrangler(c) {
  const w=c.runtime.cloudflare.workers.telegram;
  return stableJson({$schema:'../node_modules/wrangler/config-schema.json',name:w.workerName,main:'src/worker.ts',compatibility_date:c.runtime.cloudflare.compatibilityDate,vars:{APP_VERSION:c.app.version,ADMIN_APP_URL:c.runtime.cloudflare.publicAppUrl},d1_databases:[c.telegram.d1],secrets:{required:c.security.requiredSecrets.telegram},dev:{port:8791}});
}

function generatedTs(c) {
  const safe={...c, system:{name:c.app.name,version:c.app.version,environment:'production'}};
  return `export const SYSTEM_CONFIG = ${JSON.stringify(safe,null,2)} as const;\nexport const SYSTEM_CONFIG_VERSION = ${JSON.stringify(c.app.version)};\n`;
}

function generatedEnv(c) {
  return `export type RuntimeEnv = { API_BASE_URL?: string; TELEGRAM_BOT_USERNAME?: string; APP_VERSION: string };\nexport const runtimeEnv: RuntimeEnv = { API_BASE_URL: import.meta.env.VITE_API_BASE_URL, TELEGRAM_BOT_USERNAME: import.meta.env.VITE_TELEGRAM_BOT_USERNAME, APP_VERSION: ${JSON.stringify(c.app.version)} };\n`;
}

function generatedCss(c) {
  const t=c.ui.theme,l=c.ui.layout;
  return `:root {\n  --sys-bg:${t.bg};\n  --sys-panel:${t.panel};\n  --sys-panel-2:${t.panel2};\n  --sys-surface:${t.surface};\n  --sys-border:${t.border};\n  --sys-border-strong:${t.borderStrong};\n  --sys-text:${t.text};\n  --sys-muted:${t.muted};\n  --sys-cyan:${t.cyan};\n  --sys-blue:${t.blue};\n  --sys-purple:${t.purple};\n  --sys-success:${t.success};\n  --sys-warning:${t.warning};\n  --sys-danger:${t.danger};\n  --sys-header-height:${l.headerHeight}px;\n  --sys-workspace-gap:${l.workspaceGap}px;\n  --sys-panel-radius:${l.panelRadius}px;\n  --sys-grid-size:${l.gridSize}px;\n  --dark-background-color:var(--sys-bg);\n  --dark-container-background-color:var(--sys-panel);\n  --accent-color:var(--sys-cyan);\n  --text-color:var(--sys-text);\n}\n`;
}

function layout() { return `import type { ReactNode } from 'react';\nexport function SystemLayout({children}:{children:ReactNode}) { return <div className="system-layout"><main className="system-main">{children}</main><nav className="bottom-action-dock" aria-label="Editor actions"><button>Timeline</button><button>Assets</button><button>Audio</button><button>Export</button></nav></div>; }\n`; }

function indexHtml(c) { return `<!doctype html><html lang="${c.app.language}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"/><meta name="theme-color" content="${c.platforms.pwa.themeColor}"/><meta name="mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-capable" content="yes"/><link rel="manifest" href="/manifest.json"/><title>${c.app.name}</title><meta name="description" content="${c.app.description}"/><script src="https://telegram.org/js/telegram-web-app.js"></script></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n`; }

function serviceWorker(c) {
  const cache=`hendy-studio-${c.app.version.replaceAll('.','-')}`;
  return `const CACHE=${JSON.stringify(cache)};\nconst SHELL=['/','/manifest.json'];\nconst BYPASS=/^\\/(api|mcp|telegram)(\\/|$)/;\nself.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));\nself.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));\nself.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin||BYPASS.test(new URL(r.url).pathname))return;if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{caches.open(CACHE).then(c=>c.put(r,res.clone()));return res}).catch(()=>caches.match('/')));return;}e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(res=>{if(res.ok)caches.open(CACHE).then(c=>c.put(r,res.clone()));return res})));});\n`;
}

function packages(c) {
  return {
    root:packageRoot(c),
    frontend:{name:'@hendy/frontend',private:true,type:'module',scripts:{dev:'vite',build:'vite build',typecheck:'tsc -p tsconfig.json --noEmit'},dependencies:{'@vitejs/plugin-react':'^5.0.4','lucide-react':'^1.48.0','react':'^19.1.1','react-dom':'^19.1.1'},devDependencies:{'@tailwindcss/vite':'^4.3.3','@types/react':'^19.1.13','@types/react-dom':'^19.1.9','tailwindcss':'^4.3.3','typescript':`^${c.toolchain.typescript}`,'vite':'^7.3.6'}},
    backend:{name:'@hendy/backend',private:true,type:'module',scripts:{dev:'tsx watch src/server.ts',prebuild:'node ../system-config/scripts/sync-config.mjs --sync',build:'tsc -p tsconfig.json',typecheck:'tsc -p tsconfig.json --noEmit',start:'node dist/server.js',deploy:'wrangler deploy --config wrangler.jsonc'},dependencies:{'@aws-sdk/client-s3':'^3.888.0','@google/genai':'^2.24.0','cors':'^2.8.5','dotenv':'^17.2.2','express':'^5.1.0','multer':'^2.0.2','uuid':'^11.1.0','ws':'^8.18.3'},devDependencies:{'@cloudflare/workers-types':c.toolchain.workersTypes,'@types/cors':'^2.8.19','@types/express':'^5.0.3','@types/multer':'^2.0.0','@types/node':'^24.4.0','tsx':'^4.20.5','typescript':`^${c.toolchain.typescript}`,'wrangler':c.toolchain.wrangler}},
    worker:{name:'@hendy/worker',private:true,type:'module',scripts:{dev:'wrangler dev --port 8788',prebuild:'node ../system-config/scripts/sync-config.mjs --sync',build:'tsc -p tsconfig.json',typecheck:'tsc -p tsconfig.json --noEmit',deploy:'wrangler deploy --config wrangler.jsonc'},devDependencies:{'@cloudflare/workers-types':c.toolchain.workersTypes,typescript:`^${c.toolchain.typescript}`,wrangler:c.toolchain.wrangler}},
    mcp:{name:'@hendy/mcp-control-plane',private:true,type:'module',scripts:{dev:'tsx src/index.ts',prebuild:'node ../../system-config/scripts/sync-config.mjs --sync',build:'tsc -p tsconfig.json',typecheck:'tsc -p tsconfig.json --noEmit',deploy:'wrangler deploy --config wrangler.jsonc'},dependencies:{'@modelcontextprotocol/server':'2.0.0',agents:'0.24.0',zod:'^4.1.12'},devDependencies:{'@cloudflare/workers-types':c.toolchain.workersTypes,'@types/node':'^24.4.0',tsx:'^4.20.5',typescript:`^${c.toolchain.typescript}`,wrangler:c.toolchain.wrangler}},
    telegram:{name:'@hendy/telegram-worker',private:true,type:'module',scripts:{build:'tsc -p tsconfig.json',prebuild:'node ../system-config/scripts/sync-config.mjs --sync',typecheck:'tsc -p tsconfig.json --noEmit',deploy:'wrangler deploy --config wrangler.jsonc'},devDependencies:{'@cloudflare/workers-types':c.toolchain.workersTypes,typescript:`^${c.toolchain.typescript}`,wrangler:c.toolchain.wrangler}}
  };
}
async function readJson(file, fallback={}) { try{return JSON.parse(await fs.readFile(path.join(ROOT,file),'utf8'));}catch{return fallback;} }
async function writeFile(relative, content) { const file=path.join(ROOT,relative); await fs.mkdir(path.dirname(file),{recursive:true}); await fs.writeFile(file,content); }

async function outputs(c) {
  const p=packages(c);
  return new Map([
    ['package.json',stableJson(p.root)],['capacitor.config.ts',capacitor(c)],['wrangler.jsonc',rootWrangler(c)],['frontend/package.json',stableJson(p.frontend)],['backend/package.json',stableJson(p.backend)],['backend/wrangler.jsonc',backendWrangler(c)],['worker/package.json',stableJson(p.worker)],['worker/wrangler.jsonc',aiWrangler(c)],['example_bot/package.json',stableJson(p.telegram)],['example_bot/wrangler.jsonc',botWrangler(c)],['mcp/cloudflare/package.json',stableJson(p.mcp)],['mcp/cloudflare/wrangler.jsonc',mcpWrangler(c)],['mcp/cloudflare/src/runtime-config.ts',`export const MCP_RUNTIME = ${JSON.stringify({version:c.app.version,publicAppUrl:c.runtime.cloudflare.publicAppUrl},null,2)} as const;\n`],['public/manifest.json',manifest(c)],['public/_headers',headers(c)],['public/sw.js',serviceWorker(c)],['src/generated/system-config.ts',generatedTs(c)],['src/generated/system-theme.css',generatedCss(c)],['index.html',indexHtml(c)],['frontend/index.html',indexHtml(c)],['frontend/vite.config.ts',`import {defineConfig} from 'vite';\nimport react from '@vitejs/plugin-react';\nimport tailwindcss from '@tailwindcss/vite';\nexport default defineConfig({plugins:[tailwindcss(),react()],server:{port:${c.runtime.dev.vitePort},host:'127.0.0.1',strictPort:true,hmr:true}});\n`],['frontend/public/manifest.json',manifest(c)],['frontend/public/_headers',headers(c)],['frontend/public/sw.js',serviceWorker(c)],['frontend/src/generated/system-config.ts',generatedTs(c)],['frontend/src/generated/system-env.ts',generatedEnv(c)],['frontend/src/generated/system-layout.tsx',layout()],['frontend/src/generated/system-theme.css',generatedCss(c)]]);
}

async function sync(c) { const map=await outputs(c); for(const [rel,content] of map) await writeFile(rel,content); return map; }
async function dry(c) { const map=await outputs(c); const drift=[]; for(const [rel,expected] of map){let current=null;try{current=await fs.readFile(path.join(ROOT,rel),'utf8')}catch{} if(current!==expected) drift.push({file:rel,currentHash:current?hash(current):null,expectedHash:hash(expected)});} return {map,drift}; }

async function main(){
  let c=await readJson('system-config/system.config.json');
  if(args.has('--auto-patch')){const p=autoPatch(c);c=p.out;if(p.patches.length){await writeFile('system-config/system.config.json',stableJson(c));console.log(`AUTO-PATCH: applied ${p.patches.length} patch(es)`);for(const x of p.patches)console.log('  '+x);}}
  const errors=validate(c);
  if(errors.length){console.error(`SYSTEM CONFIG INVALID — ${c?.app?.name??'unknown'}`);errors.forEach(e=>console.error('ERROR: '+e));process.exit(1);}
  console.log(`SYSTEM CONFIG NOMINAL — ${c.app.name} v${c.app.version}`);
  if(args.has('--validate')) return;
  if(args.has('--dry-run')){const {drift,map}=await dry(c);console.log(`DRY-RUN: ${map.size} managed targets inspected`);for(const d of drift)console.log(`  DRIFT ${d.file} ${d.currentHash??'MISSING'} -> ${d.expectedHash}`);if(!drift.length)console.log('DRY-RUN: no configuration drift detected');if(args.has('--strict-dry-run')&&drift.length)process.exit(2);return;}
  if(args.has('--sync')){await sync(c);console.log(`SYNC: ${c.sync.managedFiles.length} managed targets generated from SOT`);return;}
}
main().catch(err=>{console.error(err);process.exit(1)});
