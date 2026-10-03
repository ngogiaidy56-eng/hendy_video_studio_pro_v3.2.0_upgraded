import {createMcpHandler} from 'agents/mcp/server';
import {McpServer} from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import {MCP_RUNTIME} from './runtime-config.js';

function createServer(){
  const server=new McpServer({name:'Hendy Video Studio Pro Control Plane',version:MCP_RUNTIME.version});

  server.registerTool('system.health',{
    title:'System health',
    description:'Check the public Hendy production gateway and service health.',
    inputSchema:z.object({})
  },async()=>{
    const paths=['/health','/api/health','/api/ai/health','/telegram/health'];
    const checks=await Promise.all(paths.map(async p=>{
      try{
        const r=await fetch(MCP_RUNTIME.publicAppUrl+p,{cache:'no-store'});
        return {path:p,status:r.status,ok:r.ok};
      }catch(e){
        return {path:p,status:0,ok:false,error:e instanceof Error?e.message:String(e)};
      }
    }));
    return {content:[{type:'text',text:JSON.stringify({ok:checks.every(x=>x.ok),checks},null,2)}]};
  });

  server.registerTool('release.info',{
    title:'Release info',
    description:'Return current application release information.',
    inputSchema:z.object({})
  },async()=>({content:[{type:'text',text:JSON.stringify({
    version:MCP_RUNTIME.version,
    architecture:'gateway+backend-worker+ai-worker+mcp-worker+telegram-worker',
    status:'production'
  },null,2)}]}));

  return server;
}

const handler=createMcpHandler(createServer);

export default {
  fetch(request:Request,env:unknown,ctx:ExecutionContext){
    const url=new URL(request.url);
    if(url.pathname==='/health'){
      return Response.json({ok:true,service:'mcp',version:MCP_RUNTIME.version,runtime:'cloudflare-workers'},{headers:{'cache-control':'no-store'}});
    }
    return handler(request,env,ctx);
  }
} satisfies ExportedHandler;
