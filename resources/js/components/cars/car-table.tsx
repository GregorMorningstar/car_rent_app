import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

export type Car = {
  id: number;
  name?: string | null;
  brand?: string | null;
  model?: string | null;
  registration_number?: string | null;
  image_path?: string | null;
  created_at?: string | null;
  price_per_day?: number | string | null;
};

type PaginationLink = { url: string | null; label: string; active: boolean };
export type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  links: PaginationLink[];
};

interface CarTableProps {
  cars: Paginated<Car>;
  perPageLabel?: string;
  showPublicBase?: string; // np. "/cars" jeśli chcesz przycisk podglądu publicznego
  className?: string;
}

const CarTable: React.FC<CarTableProps> = ({
  cars,
  perPageLabel = '10 / strona',
  showPublicBase = '/cars',
  className = '',
}) => {
  const handleDelete = (id: number) => {
    if (confirm('Usunąć ten samochód?')) {
      router.delete(`/admin/cars/${id}`, { preserveScroll: true });
    }
  };

  const normalizeImg = (p?: string | null) => {
    if (!p) return '/images/placeholder-car.jpg';
    if (p.startsWith('http')) return p;
    return p.startsWith('/') ? p : '/' + p;
  };

  return (
    <div className={`space-y-4 ${className}`}>


      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Zdjęcie</th>
                <th className="px-4 py-3 text-left font-medium">Nazwa</th>
                <th className="px-4 py-3 text-left font-medium">Marka</th>
                <th className="px-4 py-3 text-left font-medium">Model</th>
                <th className="px-4 py-3 text-left font-medium">Rejestracja</th>
                <th className="px-4 py-3 text-right font-medium">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {cars.data.map(car => {
                const title =
                  car.name ||
                  [car.brand, car.model].filter(Boolean).join(' ') ||
                  `Samochód #${car.id}`;
                return (
                  <tr key={car.id} className="border-t hover:bg-muted/20 transition">
                    <td className="px-4 py-3 font-mono text-xs">{car.id}</td>
                    <td className="px-4 py-3">
                      <div className="h-12 w-20 overflow-hidden rounded border bg-muted/40">
                        <img
                          src={normalizeImg(car.image_path)}
                          alt={title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/placeholder-car.jpg';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[10px] text-muted-foreground">
                        {car.created_at
                          ? new Date(car.created_at).toLocaleDateString('pl-PL')
                          : ''}
                      </div>
                    </td>
                    <td className="px-4 py-3">{car.brand || <span className="text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-3">
                      {car.registration_number || <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/${car.id}`}
                          className="inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs hover:bg-muted transition"
                          title="Podgląd"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          href={`/admin/cars/${car.id}`}
                          className="inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs hover:bg-muted transition"
                          title="Edytuj"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 transition"
                          title="Usuń"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {cars.data.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-muted-foreground"
                  >
                    Brak samochodów.
                  </td>
                </tr>
              )}
            </tbody>
        </table>
      </div>

      {cars.links.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {cars.links.map((l, i) => {
            const label = l.label
              .replace('&laquo;', '«')
              .replace('&raquo;', '»');
            if (!l.url) {
              return (
                <span
                  key={i}
                  className="px-3 py-1 rounded border text-xs text-muted-foreground bg-muted/30"
                >
                  {label}
                </span>
              );
            }
            return (
              <Link
                key={i}
                href={l.url}
                preserveScroll
                className={`px-3 py-1 rounded border text-xs transition ${
                  l.active
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'hover:bg-muted/60'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CarTable;
