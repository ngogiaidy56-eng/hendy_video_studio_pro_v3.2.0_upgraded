import {spawnSync} from 'node:child_process';

const bun=process.platform==='win32'?'bun.exe':'bun';

const targets = [
  {name:'hendy-video-studio-pro-backend', label:'BACKEND · Express on Workers', config:'backend/wrangler.jsonc'},
  {name:'hendy-video-studio-pro-ai', label:'AI EDGE · MeloTTS', config:'worker/wrangler.jsonc'},
  {name:'hendy-video-studio-pro-mcp', label:'MCP · Streamable HTTP', config:'mcp/cloudflare/wrangler.jsonc'},
  {name:'hendy-video-studio-pro-telegram', label:'TELEGRAM · Webhook', config:'example_bot/wrangler.jsonc'},
  {name:'hendy-video-studio-pro', label:'GATEWAY · React 19 + Static Assets', config:'wrangler.jsonc'}
];

const run=(label,args)=>{
  console.log('\n=== '+label+' ===');
  const r=spawnSync(bun,args,{stdio:'inherit',shell:false});
  if(r.status!==0) process.exit(r.status ?? 1);
};

run('RELEASE GATE · validate + sync + build',['run','build']);

// A Workers Builds project is connected to exactly one Worker. Cloudflare
// enforces that the Wrangler config deployed by that build matches the
// connected Worker name. Therefore the repository's top-level Workers Build
// deploys only the gateway Worker. The other service Workers have their own
// Wrangler configs and should be connected to separate Workers Builds projects
// (or deployed together from a local/CI runner with Cloudflare credentials).
const isWorkersBuild = process.env.WORKERS_CI === '1';
const connectedName = process.env.WRANGLER_CI_OVERRIDE_NAME?.trim();

if (isWorkersBuild) {
  if (connectedName && connectedName !== 'hendy-video-studio-pro') {
    console.error('\nERROR: This repository is configured as the gateway Workers Build.');
    console.error('Connected Worker: '+connectedName);
    console.error('Expected: hendy-video-studio-pro');
    console.error('Connect the backend/AI/MCP/Telegram configs as separate Workers Builds.');
    process.exit(2);
  }

  run('GATEWAY · React 19 + Static Assets',['x','wrangler','deploy','--config','wrangler.jsonc']);
  console.log('\nWORKERS BUILDS GATEWAY DEPLOYED: hendy-video-studio-pro');
} else {
  for (const target of targets) {
    run(target.label,['x','wrangler','deploy','--config',target.config]);
  }
  console.log('\nALL HENDY CLOUD RUNTIMES DEPLOYED.');
}
