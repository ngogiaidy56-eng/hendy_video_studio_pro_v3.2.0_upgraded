import {spawnSync} from 'node:child_process';

const bun=process.platform==='win32'?'bun.exe':'bun';

const run=(label,args)=>{
  console.log('\n=== '+label+' ===');
  const r=spawnSync(bun,args,{stdio:'inherit',shell:false});
  if(r.status!==0) process.exit(r.status ?? 1);
};

run('RELEASE GATE · validate + sync + build',['run','build']);
run('BACKEND · Express on Workers',['x','wrangler','deploy','--config','backend/wrangler.jsonc']);
run('AI EDGE · MeloTTS',['x','wrangler','deploy','--config','worker/wrangler.jsonc']);
run('MCP · Streamable HTTP',['x','wrangler','deploy','--config','mcp/cloudflare/wrangler.jsonc']);
run('TELEGRAM · Webhook',['x','wrangler','deploy','--config','example_bot/wrangler.jsonc']);
run('GATEWAY · React 19 + Static Assets',['x','wrangler','deploy','--config','wrangler.jsonc']);
console.log('\nALL HENDY CLOUD RUNTIMES DEPLOYED.');
