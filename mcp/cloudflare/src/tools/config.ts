import fs from 'node:fs/promises';
import path from 'node:path';
export async function validateConfig() {
  const file=path.resolve(process.cwd(),'system-config/system.config.json');
  const text=await fs.readFile(file,'utf8');
  const json=JSON.parse(text);
  return {ok:Boolean(json.system?.version),version:json.system?.version};
}
