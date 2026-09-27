import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import type {Readable} from 'node:stream';

const account = process.env.R2_ACCOUNT_ID || '';
const endpoint = process.env.R2_ENDPOINT || (account ? `https://${account}.r2.cloudflarestorage.com` : undefined);
const memoryStore = new Map<string, { buffer: Buffer; contentType: string }>();

function getClient(): S3Client | null {
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) return null;
  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

export const r2 = getClient();
const bucket = process.env.R2_BUCKET || 'ai-studio-pro';

export async function uploadToR2(key:string, body:Buffer|string|Readable, contentType='application/octet-stream') {
  const client = getClient();
  if (client) {
    try {
      await client.send(new PutObjectCommand({Bucket:bucket,Key:key,Body:body as never,ContentType:contentType}));
      return {bucket,key};
    } catch (err) {
      console.warn('R2 upload failed, falling back to memory store:', err);
    }
  }
  const buf = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === 'string' ? body : '');
  memoryStore.set(key, { buffer: buf, contentType });
  return {bucket: 'memory', key};
}
export async function getFromR2(key:string) {
  const client = getClient();
  if (client) {
    return client.send(new GetObjectCommand({Bucket:bucket,Key:key}));
  }
  const item = memoryStore.get(key);
  if (!item) throw new Error(`Not found: ${key}`);
  return { Body: item.buffer, ContentType: item.contentType };
}
