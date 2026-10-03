import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';

const root = path.resolve(new URL('../..', import.meta.url).pathname);

function run(cmd, args, cwd) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, {cwd, shell:false, env:{...process.env, CI:'1'}, stdio:['ignore','pipe','pipe']});
    let stdout='', stderr='';
    child.stdout.on('data', d => stdout += d);
    child.stderr.on('data', d => stderr += d);
    child.on('close', code => resolve({code, stdout, stderr}));
  });
}

export async function strictDryRun(job) {
  const tmp = path.join(root, '.tmp', `dry-run-${Date.now()}`);
  await fs.cp(root, tmp, {recursive:true, filter:(src) => !src.includes(`${path.sep}.git${path.sep}`) && !src.includes(`${path.sep}node_modules${path.sep}`)});
  try {
    const commands = {
      'config-validate': ['node',['system-config/scripts/validate-config.mjs']],
      'frontend-build': ['npm',['--workspace','frontend','run','build']],
      'backend-typecheck': ['npm',['--workspace','backend','run','typecheck']],
      'worker-typecheck': ['npm',['--workspace','worker','run','typecheck']]
    };
    if (!commands[job]) throw new Error(`Job not allowed: ${job}`);
    return {job, ...(await run(commands[job][0], commands[job][1], tmp))};
  } finally {
    await fs.rm(tmp, {recursive:true, force:true});
  }
}
