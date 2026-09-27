import type { ReactNode } from 'react';
export function Header({version, admin, actions}:{version:string;admin:boolean;actions?:ReactNode}) {
  return <header className="panel row" style={{justifyContent:'space-between',position:'sticky',top:8,zIndex:10}}>
    <div><strong>🎬 Hendy Video Studio Pro</strong><div className="muted">v{version} · {admin ? 'ADMIN' : 'EDITOR'} · React 19</div></div>
    <div className="row">{actions}</div>
  </header>;
}
