import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(new URL('../..', import.meta.url).pathname);
const out = path.join(root, 'SYSTEM_SOT_SOURCE_CODE.md');
const skip = new Set(['node_modules', '.git', 'dist', '.tmp', 'storage/builds']);
const exts = new Set(['.ts','.tsx','.js','.mjs','.json','.jsonc','.css','.html','.md','.yml','.yaml','.txt','.example']);
function walk(dir) {
  const items = fs.readdirSync(dir, {withFileTypes:true});
  const files=[];
  for (const item of items) {
    const full=path.join(dir,item.name), rel=path.relative(root,full).replaceAll(path.sep,'/');
    if (item.isDirectory()) { if(!skip.has(item.name) && !rel.startsWith('storage/builds/')) files.push(...walk(full)); }
    else if (rel !== 'SYSTEM_SOT_SOURCE_CODE.md') {
      const ext=path.extname(item.name);
      if (exts.has(ext) || item.name.endsWith('.env.example')) files.push(rel);
    }
  }
  return files;
}
const files=walk(root).sort();
let md=`# Hendy Video Studio Pro v2.4.0 — Full Source Snapshot\n\nGenerated from the repository working tree. Secrets, node_modules, dist, temp files and binary production artifacts are excluded.\n\n## File index\n\n${files.map(f=>`- \`${f}\``).join('\n')}\n\n`;
for (const rel of files) {
  const content=fs.readFileSync(path.join(root,rel),'utf8').replace(/```/g,'``\\`');
  const lang=path.extname(rel).slice(1) || (rel.endsWith('Dockerfile')?'dockerfile':'text');
  md += `## \`${rel}\`\n\n\`\`\`${lang}\n${content}\n\`\`\`\n\n`;
}
fs.writeFileSync(out,md);
fs.writeFileSync(path.join(root,'FILE_LIST.txt'), files.join('\n')+'\n');
console.log(`Exported ${files.length} text/source files.`);
