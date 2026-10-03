import {createServer} from 'node:http';
const port=Number(process.env.MCP_PORT || 8790);
createServer((req,res)=>{
  if(req.url==='/health'){res.writeHead(200,{'content-type':'application/json'});res.end(JSON.stringify({ok:true,service:'mcp-local'}));return;}
  res.writeHead(404);res.end();
}).listen(port,'127.0.0.1',()=>console.log('MCP local health server on :' + port));
