import {createServer} from 'node:http';
import {validateConfig} from './tools/config.js';
import {sandboxDryRun} from './tools/sandbox.js';
import {cloudflareStatus,deployRelease,rollbackRelease} from './tools/cloudflare.js';
import {githubBuildStatus} from './tools/github.js';
import {observabilityErrors} from './tools/observability.js';
import {ALLOWED_TOOLS} from './policies/allowlist.js';

const port=Number(process.env.MCP_PORT || 8788);
const secret=process.env.MCP_SHARED_SECRET;

const handlers:Record<string,(args:any)=>Promise<unknown>|unknown>={
  'config.validate':async()=>validateConfig(),
  'sandbox.dryRun':async(a)=>sandboxDryRun(a?.job),
  'github.getBuildStatus':githubBuildStatus,
  'cloudflare.getDeployment':cloudflareStatus,
  'cloudflare.deployRelease':deployRelease,
  'cloudflare.rollbackRelease':rollbackRelease,
  'observability.getErrors':observabilityErrors
};

const httpServer=createServer(async (req,res)=>{
  try {
    if (secret && req.headers.authorization !== `Bearer ${secret}`) {
      res.writeHead(401, {'content-type':'application/json'});
      return res.end(JSON.stringify({error:'Unauthorized'}));
    }
    if (req.method === 'GET' && req.url === '/mcp') {
      res.writeHead(200, {'content-type':'application/json'});
      return res.end(JSON.stringify({name:'Hendy Cloudflare Control Plane',protocol:'streamable-http-compatible scaffold',tools:ALLOWED_TOOLS}));
    }
    if (req.method !== 'POST' || req.url !== '/mcp') {
      res.writeHead(404, {'content-type':'application/json'});
      return res.end(JSON.stringify({error:'Not Found'}));
    }
    let raw='';
    for await (const chunk of req) { raw += chunk; if (raw.length > 64*1024) break; }
    const body=JSON.parse(raw || '{}');
    const tool=String(body.tool || body.method || '');
    if (!ALLOWED_TOOLS.includes(tool as any)) {
      res.writeHead(403, {'content-type':'application/json'});
      return res.end(JSON.stringify({error:'Tool not allowlisted'}));
    }
    const result=await handlers[tool](body.arguments || body.args || {});
    res.writeHead(200, {'content-type':'application/json'});
    res.end(JSON.stringify({ok:true,tool,result}));
  } catch (error) {
    res.writeHead(500, {'content-type':'application/json'});
    res.end(JSON.stringify({error:error instanceof Error ? error.message : String(error)}));
  }
});
httpServer.listen(port,'127.0.0.1',()=>console.log(`MCP control plane listening on http://127.0.0.1:${port}/mcp`));
