export function githubBuildStatus(){return {repository:process.env.GITHUB_REPOSITORY || null,status:'unknown',note:'Connect GitHub API to read audited workflow status.'};}
