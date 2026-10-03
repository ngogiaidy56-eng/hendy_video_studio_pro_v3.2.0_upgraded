export const ALLOWED_TOOLS = ['config.validate','sandbox.dryRun','github.getBuildStatus','cloudflare.getDeployment','cloudflare.deployRelease','cloudflare.rollbackRelease','observability.getErrors'] as const;
export type AllowedTool=typeof ALLOWED_TOOLS[number];
