const base=process.env.PUBLIC_APP_URL || 'https://hendy-video-studio-pro.ngogiaidy56.workers.dev';
const r=await fetch(base+'/health/all',{cache:'no-store'});
const data=await r.json();
console.log(JSON.stringify(data,null,2));
if(!r.ok || !data.ok) process.exit(1);
console.log('PRODUCTION E2E HEALTH: PASS');
