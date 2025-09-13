import { ReactNode } from 'react';
import { UserMenu } from '@/components/ui/user-menu';
import { usePage } from '@inertiajs/react';

interface UserLayoutProps {
  children: ReactNode;
  breadcrumbs?: Array<{ title: string; href?: string }>;
  title?: string;
}

export default function UserLayout({ children, breadcrumbs, title }: UserLayoutProps) {
  const page = usePage<{ auth?: { user?: { name?: string } } }>();
  const userName = page.props.auth?.user?.name || 'Użytkownik';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r bg-card/40 backdrop-blur sm:block">
        <UserMenu userName={userName} />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center gap-4 border-b px-4">
          <div className="flex flex-1 flex-col">
            {title && <h1 className="text-lg font-semibold leading-none">{title}</h1>}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="mt-1 text-xs text-muted-foreground">
                {breadcrumbs.map((b, i) => (
                  <span key={i}>
                    {b.href ? (
                      <a href={b.href} className="hover:underline">
                        {b.title}
                      </a>
                    ) : (
                      b.title
                    )}
                    {i < breadcrumbs.length - 1 && ' / '}
                  </span>
                ))}
              </nav>
            )}
          </div>
          {/* Placeholder na przyszłe akcje (np. profil) */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {userName}
          </div>
        </header>

        {/* Content scrollable */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}