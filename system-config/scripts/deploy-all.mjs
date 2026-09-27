import {spawnSync} from 'node:child_process';

const run=(label,args)=>{
  console.log('\n=== '+label+' ===');
  const cmd=process.platform==='win32'?'npx.cmd':'npx';
  const r=spawnSync(cmd,['wrangler',...args],{stdio:'inherit',shell:false});
  if(r.status!==0) process.exit(r.status ?? 1);
};

run('BACKEND · Express on Workers',['deploy','--config','backend/wrangler.jsonc']);
run('AI EDGE · MeloTTS',['deploy','--config','worker/wrangler.jsonc']);
run('MCP · Streamable HTTP',['deploy','--config','mcp/cloudflare/wrangler.jsonc']);
run('TELEGRAM · Webhook',['deploy','--config','example_bot/wrangler.jsonc']);
run('GATEWAY · React 19 + Static Assets',['deploy','--config','wrangler.jsonc']);
console.log('\nALL HENDY CLOUD RUNTIMES DEPLOYED.');
