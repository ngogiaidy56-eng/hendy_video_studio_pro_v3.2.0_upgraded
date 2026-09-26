import fs from 'node:fs';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const configPath = path.join(root, 'system.config.json');
const schemaPath = path.join(root, 'schema', 'system-config.schema.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

function fail(message){console.error(`SOT validation failed: ${message}`);process.exit(1)}
function isHex(v){return typeof v==='string' && /^#[0-9a-fA-F]{6}$/.test(v)}
function required(obj, keys, label){for(const k of keys)if(!(k in obj))fail(`${label}.${k} is required`)}
required(config,['system','network','features','ai','storage','editor','theme','managedFiles'],'root');
required(config.system,['name','version','environment'],'system');
if(!/^\d+\.\d+\.\d+$/.test(config.system.version))fail('system.version must be semver-like');
if(!['development','staging','production'].includes(config.system.environment))fail('system.environment invalid');
required(config.network,['sandboxPort','backendPort','frontendPort','apiBasePath','mcpPath'],'network');
for(const k of ['sandboxPort','backendPort','frontendPort'])if(!Number.isInteger(config.network[k])||config.network[k]<1024||config.network[k]>65535)fail(`network.${k} invalid port`);
for(const k of ['apiBasePath','mcpPath'])if(typeof config.network[k]!=='string'||!config.network[k].startsWith('/'))fail(`network.${k} invalid path`);
if(typeof config.features!=='object'||Array.isArray(config.features))fail('features must be object');
for(const [k,v] of Object.entries(config.features))if(typeof v!=='boolean')fail(`features.${k} must be boolean`);
required(config.ai,['provider','models','temperature'],'ai');
required(config.ai.models,['translation','ocr','stt'],'ai.models');
if(typeof config.ai.temperature!=='number'||config.ai.temperature<0||config.ai.temperature>2)fail('ai.temperature invalid');
required(config.storage,['provider','bucketEnv','zeroEgress'],'storage');
if(typeof config.storage.zeroEgress!=='boolean')fail('storage.zeroEgress must be boolean');
required(config.editor,['audioChannels','duckingGain','transitionGapSeconds'],'editor');
if(!Array.isArray(config.editor.audioChannels)||!config.editor.audioChannels.length)fail('editor.audioChannels empty');
if(config.editor.duckingGain<0||config.editor.duckingGain>1)fail('editor.duckingGain invalid');
if(config.editor.transitionGapSeconds<0)fail('editor.transitionGapSeconds invalid');
required(config.theme,['darkBackgroundColor','darkContainerBackgroundColor','accentColor','textColor'],'theme');
for(const [k,v] of Object.entries(config.theme))if(!isHex(v))fail(`theme.${k} invalid color`);
if(!Array.isArray(config.managedFiles)||new Set(config.managedFiles).size!==config.managedFiles.length)fail('managedFiles must be unique array');

// Sanity-check the schema file is present and is a JSON Schema document.
if(schema.$schema?.includes('json-schema')!==true || schema.type!=='object') fail('schema/system-config.schema.json is not a valid object-schema document');
console.log(`SOT valid: ${config.system.name} v${config.system.version}`);
