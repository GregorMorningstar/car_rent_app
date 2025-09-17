import AdminLayout from "@/layouts/AdminLayout";
import { router, Link } from "@inertiajs/react";
import { CarTable } from "@/components/cars/admin-index";
import { Plus } from "lucide-react";

type Car = {
  id: number;
  name?: string | null;
  brand?: string | null;
  model?: string | null;
  image_path?: string | null;
  price_per_day?: number | string | null;
  created_at?: string | null;
};
type PaginationLink = { url: string | null; label: string; active: boolean };
type Paginated<T> = { data: T[]; current_page: number; last_page: number; total: number; links: PaginationLink[] };

interface Props {
  cars: Paginated<Car>;
}

export default function AdminCarsPage({ cars }: Props) {
  const onDelete = (id: number) => {
    if (confirm('Usunąć ten samochód?')) {
      router.delete(`/admin/cars/${id}`, { preserveScroll: true });
    }
  };
  const normalizeImage = (img?: string | null) => {
    if (!img) return '/images/placeholder-car.jpg';
    if (img.startsWith('http')) return img;
    if (!img.startsWith('/')) return '/' + img;
    return img;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Samochody</h1>
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

        <CarTable
          cars={cars}
          showRouteBase="/admin/cars"
          onDelete={onDelete}
          normalizeImage={normalizeImage}
        />
      </div>
    </AdminLayout>
  );
}
