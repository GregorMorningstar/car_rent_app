import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2, Plus } from 'lucide-react';

type Car = {
  id: number;
  registration_number?: string | null; // added
  name?: string | null;
  brand?: string | null;
  model?: string | null;
  image_path?: string | null;
  price_per_day?: number | string | null;
  created_at?: string | null;
};
type PaginationLink = { url: string | null; label: string; active: boolean };
type Paginated<T> = {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  links: PaginationLink[];
};

interface CarTableProps {
  cars: Paginated<Car>;
  showRouteBase: string;
  onDelete: (id: number) => void;
  normalizeImage: (img?: string | null) => string;
}

// NOTE: wykonaj (jeśli jeszcze nie): php artisan storage:link
// Dzięki temu pliki z storage/app/public są dostępne pod /storage/*
// LOCAL placeholder (jeśli dodasz plik public/images/placeholder-car.jpg)
const PLACEHOLDER_LOCAL = '/images/placeholder-car.jpg';
// Offline safe (inline SVG)
const PLACEHOLDER_INLINE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120" fill="none">
      <rect width="240" height="120" rx="8" fill="#f1f5f9"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="14" fill="#64748b">
        Brak zdjęcia
      </text>
    </svg>`
  );

export const CarTable: React.FC<CarTableProps> = ({ cars, showRouteBase, onDelete, normalizeImage }) => (
  <>
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/40 text-left">
          <tr className="text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Zdjęcie</th>
            <th className="px-4 py-3 font-medium">Nazwa / Model</th>
            <th className="px-4 py-3 font-medium">Cena / dzień</th>
            <th className="px-4 py-3 font-medium">Utworzono</th>
            <th className="px-4 py-3 font-medium text-right">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {cars.data.map(car => {
            const title =
              car.name ||
              [car.brand, car.model].filter(Boolean).join(' ') ||
              `Samochód #${car.id}`;
            return (
              <tr key={car.id} className="border-t hover:bg-muted/30 transition">
                <td className="px-4 py-3 font-mono text-xs">{car.id}</td>
                <td className="px-4 py-3">
                  <div className="h-14 w-24 overflow-hidden rounded border bg-muted/40">
                    <img
                      src={normalizeImage(car.image_path)}
                      alt={title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        // Pierwszy fallback: lokalny placeholder (jeśli istnieje w projekcie)
                        if (!el.dataset.fallback1) {
                          el.dataset.fallback1 = '1';
                          el.src = PLACEHOLDER_LOCAL;
                          return;
                        }
                        // Drugi fallback: inline SVG (zawsze dostępny)
                        if (!el.dataset.fallback2) {
                          el.dataset.fallback2 = '1';
                          el.src = PLACEHOLDER_INLINE;
                        }
                      }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium leading-tight line-clamp-2">
                    {title}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {(car.brand || '')} {(car.model || '')}
                  </div>
                  {car.registration_number && (
                    <div className="text-[11px] text-blue-600">
                      Rej: {car.registration_number}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  {car.price_per_day ? (
                    <span className="font-medium">
                      {Number(car.price_per_day).toFixed(2)} zł
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {car.created_at
                    ? new Date(car.created_at).toLocaleDateString('pl-PL')
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`${showRouteBase}/${car.id}`}
                      className="inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs hover:bg-muted transition"
                      title="Podgląd"
                    >
                      <Eye size={14} />
                    </Link>
                    <Link
                      href={`/admin/cars/${car.id}/edit`}
                      className="inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs hover:bg-muted transition"
                      title="Edytuj"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => onDelete(car.id)}
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
              <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                Brak samochodów do wyświetlenia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {cars.links.length > 0 && (
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {cars.links.map((l, i) => {
          const label = l.label.replace('&laquo;', '«').replace('&raquo;', '»');
            if (!l.url) {
              return (
                <span key={i} className="px-3 py-1 rounded border text-xs text-muted-foreground bg-muted/30">
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
                    : 'hover:bg-muted/50'
                }`}
              >
                {label}
              </Link>
            );
        })}
      </div>
    )}
  </>
);

interface Props {
  cars: Paginated<Car>;
  showRouteBase?: string;
}

const AdminCarsIndex: React.FC<Props> = ({ cars, showRouteBase = '/cars' }) => {
  const onDelete = (id: number) => {
    if (confirm('Usunąć ten samochód?')) {
      router.delete(`/admin/cars/${id}`, { preserveScroll: true });
    }
  };
  const normalizeImage = (img?: string | null) => {
    if (!img) return PLACEHOLDER_LOCAL;

    // Absolutne URL
    if (img.startsWith('http://') || img.startsWith('https://')) return img;

    // Już poprawna ścieżka do storage
    if (img.startsWith('/storage/')) return img;
    if (img.startsWith('storage/')) return '/' + img;

    // Przypadek przechowywania jako 'cars/plik.jpg'
    if (img.startsWith('cars/')) return '/storage/' + img;

    // Przypadek gdy zapisano z wiodącym slashem '/cars/plik.jpg'
    if (img.startsWith('/cars/')) return '/storage' + img; // => /storage/cars/plik.jpg

    // Gdy zapisano jako 'public/cars/...'
    if (img.startsWith('public/cars/')) return '/storage/' + img.replace(/^public\//, '');
    if (img.startsWith('/public/cars/')) return '/storage/' + img.replace(/^\/public\//, '');

    // Inne przypadki ze slashem traktujemy jako ścieżkę public (zostawiamy)
    if (img.startsWith('/')) return img;

    // Domyślnie przyjmij że to plik w storage/app/public
    return '/storage/' + img;
  };

  return (
    <div className="space-y-6">
      {/* Pasek nagłówka */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Samochody (admin)</h1>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/cars/create"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition"
          >
            <Plus size={16} />
            Dodaj
          </Link>
          <span className="text-xs text-muted-foreground border rounded px-2 py-1">
            Razem: {cars.total}
          </span>
        </div>
      </div>

      {/* Tabela wyodrębniona */}
      <CarTable
        cars={cars}
        showRouteBase={showRouteBase}
        onDelete={onDelete}
        normalizeImage={normalizeImage}
      />
    </div>
  );
};

export default AdminCarsIndex;
