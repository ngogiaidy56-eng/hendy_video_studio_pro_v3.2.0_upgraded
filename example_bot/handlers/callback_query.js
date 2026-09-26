export function handleCallback(data){if(data==='open_sot')return {action:'open-mini-app',url:`${process.env.ADMIN_APP_URL || 'https://example.pages.dev'}?admin=true`};return {action:'noop'};}
