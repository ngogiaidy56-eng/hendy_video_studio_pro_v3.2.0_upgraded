import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const syncScript = path.join(HERE, 'sync-config.mjs');

const child = spawn(process.execPath, [syncScript, '--validate'], { stdio: 'inherit' });
child.on('exit', (code) => {
  process.exit(code ?? 0);
});
