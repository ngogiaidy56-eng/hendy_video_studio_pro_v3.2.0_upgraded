import type { ReactNode } from 'react';
export function SystemLayout({children}:{children:ReactNode}) { return <div className="system-layout"><main className="system-main">{children}</main><nav className="bottom-action-dock" aria-label="Editor actions"><button>Timeline</button><button>Assets</button><button>Audio</button><button>Export</button></nav></div>; }
