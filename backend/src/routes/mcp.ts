import { Router, Request, Response } from 'express';

export const mcpRouter = Router();

mcpRouter.get('/', (req: Request, res: Response) => {
  res.json({
    ok: true,
    protocol: 'mcp-1.0',
    server: 'Hendy Cloudflare & Infrastructure MCP Hub',
    tools: [
      'query_d1_database',
      'verify_signed_download_gate',
      'scan_antivirus_package',
      'simulate_traffic_burst',
      'fetch_cluster_topology'
    ]
  });
});
