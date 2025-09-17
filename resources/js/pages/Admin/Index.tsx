import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import AdminCarsIndex from '@/components/cars/admin-index';

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
  cars?: Paginated<Car>; // optional
}

const AdminIndex: React.FC<Props> & { layout?: (page: React.ReactNode) => React.ReactNode } = ({ cars }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p>Witaj w panelu administracyjnym.</p>
      {cars && (
        <div className="mt-10">
          <AdminCarsIndex cars={cars} showRouteBase="/admin/cars" />
        </div>
      )}
    </div>
  );
};

AdminIndex.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default AdminIndex;
