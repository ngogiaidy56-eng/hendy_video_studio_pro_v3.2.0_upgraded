import process from 'node:process';

const required = ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing environment: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Cloudflare env push is intentionally explicit. Use Wrangler secrets/vars for production and never print secret values.');
