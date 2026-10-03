import 'dotenv/config';
import {app} from './app.js';
const port=Number(process.env.BACKEND_PORT || 8787);
app.listen(port,'0.0.0.0',()=>console.log('Backend listening on :' + port));
