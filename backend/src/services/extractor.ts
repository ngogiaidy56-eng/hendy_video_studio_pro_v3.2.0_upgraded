export type ExtractedSubtitle = {startMs:number; endMs:number; text:string};

export async function extractSubtitlesFromUrl(rawUrl:string):Promise<ExtractedSubtitle[]> {
  const url = new URL(rawUrl);
  if (!['http:','https:'].includes(url.protocol)) throw new Error('Only http/https URLs are allowed');
  // Provider integrations should be implemented behind this contract.
  // Do not silently scrape sites whose terms or robots policies disallow it.
  return [];
}
