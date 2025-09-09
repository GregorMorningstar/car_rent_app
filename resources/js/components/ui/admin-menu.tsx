import { Link } from '@inertiajs/react';

interface AdminMenuProps {
  userName?: string;
}

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Samochody', href: '/cars' },
  { label: 'Rezerwacje', href: '/reservations' },
  { label: 'Klienci', href: '/customers' },
  { label: 'Płatności', href: '/payments' },
  { label: 'Raporty', href: '/reports' },
  { label: 'Ustawienia', href: '/settings' },
];

export function AdminMenu({ userName }: AdminMenuProps) {
  return (
    <nav className="flex h-full flex-col gap-2 p-4">
      <div className="mb-1 px-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Panel administracyjny
      </div>
      <div className="mb-4 px-2 text-xs text-muted-foreground">
        {userName || 'Użytkownik'}
      </div>
      <ul className="flex flex-1 flex-col gap-1">
        {menuItems.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t pt-4 flex flex-col gap-2">
        <Link
          href="/logout"
          method="post"
          as="button"
          className="w-full rounded-md bg-destructive/10 px-3 py-2 text-left text-xs font-medium text-destructive hover:bg-destructive/20"
        >
          Wyloguj
        </Link>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CarRent
        </div>
      </div>
    </nav>
  );
}