import { httpServerHandler } from 'cloudflare:node';
import { app } from './app.js';
app.listen(8787);
export default httpServerHandler({port:8787});
