import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import type {Readable} from 'node:stream';

const account = process.env.R2_ACCOUNT_ID || '';
const endpoint = process.env.R2_ENDPOINT || (account ? `https://${account}.r2.cloudflarestorage.com` : undefined);
export const r2 = new S3Client({region:'auto',endpoint,credentials:{accessKeyId:process.env.R2_ACCESS_KEY_ID || '',secretAccessKey:process.env.R2_SECRET_ACCESS_KEY || ''}});
const bucket = process.env.R2_BUCKET || 'ai-studio-pro';

export async function uploadToR2(key:string, body:Buffer|string|Readable, contentType='application/octet-stream') {
  await r2.send(new PutObjectCommand({Bucket:bucket,Key:key,Body:body as never,ContentType:contentType}));
  return {bucket,key};
}
export async function getFromR2(key:string) { return r2.send(new GetObjectCommand({Bucket:bucket,Key:key})); }
