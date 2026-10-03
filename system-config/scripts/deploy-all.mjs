import {spawnSync} from 'node:child_process';
const bun=process.platform==='win32'?'bun.exe':'bun';
const run=(label,args)=>{console.log(`\n=== ${label} ===`);const r=spawnSync(bun,args,{stdio:'inherit',shell:false});if(r.status!==0)process.exit(r.status??1)};
const isWorkersBuild=process.env.WORKERS_CI==='1';
const connected=process.env.WRANGLER_CI_OVERRIDE_NAME?.trim();
if(isWorkersBuild){
  if(connected && connected!=='hendy-video-studio-pro'){console.error(`ERROR: connected Worker ${connected} is not the gateway.`);process.exit(2)}
  run('GATEWAY BUILD',['run','build']);
  run('GATEWAY DEPLOY',['x','wrangler','deploy','--config','wrangler.jsonc']);
  console.log('\nWORKERS BUILDS GATEWAY DEPLOYED: hendy-video-studio-pro');
  process.exit(0);
}
run('RELEASE GATE',['run','release:gate']);
for(const t of [
  ['BACKEND','backend/wrangler.jsonc'],['AI EDGE','worker/wrangler.jsonc'],['MCP','mcp/cloudflare/wrangler.jsonc'],['TELEGRAM','example_bot/wrangler.jsonc'],['GATEWAY','wrangler.jsonc']
]) run(t[0]+ ' DEPLOY',['x','wrangler','deploy','--config',t[1]]);
console.log('\nALL HENDY CLOUD RUNTIMES DEPLOYED.');
