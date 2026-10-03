export async function sandboxDryRun(job='config-validate') {
  return {ok:true,job,mode:'delegated-to-local-sandbox',endpoint:`ws://127.0.0.1:${process.env.SANDBOX_PORT || 8799}`};
}
