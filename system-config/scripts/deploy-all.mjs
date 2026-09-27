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

// Workers Builds sets WRANGLER_CI_OVERRIDE_NAME to the Worker connected in the
// Cloudflare dashboard. A single connected build must deploy only that Worker;
// deploying every config would make Wrangler overwrite the connected Worker
// name on each invocation. Local/manual CLI runs still deploy all targets.
const connectedName = process.env.WRANGLER_CI_OVERRIDE_NAME?.trim();

if (connectedName) {
  const target = targets.find(item => item.name === connectedName);
  if (!target) {
    console.error('\nERROR: WRANGLER_CI_OVERRIDE_NAME does not match a Hendy Worker: '+connectedName);
    console.error('Expected one of: '+targets.map(item => item.name).join(', '));
    process.exit(2);
  }

  run(target.label,['x','wrangler','deploy','--config',target.config]);
  console.log('\nWORKERS BUILDS TARGET DEPLOYED: '+target.name);
} else {
  for (const target of targets) {
    run(target.label,['x','wrangler','deploy','--config',target.config]);
  }
  console.log('\nALL HENDY CLOUD RUNTIMES DEPLOYED.');
}
