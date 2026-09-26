import {WebSocketServer} from 'ws';
import {MAX_PAYLOAD_BYTES} from './policy.mjs';
import {strictDryRun} from './dryRun.mjs';

const port = Number(process.env.SANDBOX_PORT || 8799);
const wss = new WebSocketServer({port, maxPayload:MAX_PAYLOAD_BYTES});

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({type:'ready', port, mode:'local-sandbox'}));
  socket.on('message', async (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.type !== 'dry-run') return socket.send(JSON.stringify({type:'error', error:'Unsupported operation'}));
      const result = await strictDryRun(msg.payload?.job || 'config-validate');
      socket.send(JSON.stringify({type:'dry-run-result', result}));
    } catch (error) {
      socket.send(JSON.stringify({type:'dry-run-error', error:error instanceof Error ? error.message : String(error)}));
    }
  });
});

console.log(`Sandbox WebSocket listening on ws://127.0.0.1:${port}`);
