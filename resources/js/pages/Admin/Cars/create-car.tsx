import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import CreateCarCard from '@/components/create-car_card';
import { Head, usePage } from '@inertiajs/react';

const CreateCarPage: React.FC & { layout?: (page: React.ReactNode) => React.ReactNode } = () => {
  const { props } = usePage<{ flash?: { success?: string } }>();
  const successMsg = props.flash?.success;
  const [showSuccess, setShowSuccess] = useState<boolean>(!!successMsg);

  useEffect(() => {
    if (successMsg) {
      setShowSuccess(true);
      const t = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Head title="Dodaj samochód" />
      <div className="flex-1 flex">
        <div className="w-full max-w-3xl mx-auto p-6 md:p-8 flex flex-col">
          <h1 className="text-2xl font-semibold mb-2">Dodaj samochód</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Uzupełnij formularz aby dodać nowy pojazd do bazy.
          </p>

          {successMsg && showSuccess && (
            <div className="mb-6 flex items-start justify-between gap-4 rounded-md border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-700">
              <span>{successMsg}</span>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="leading-none text-green-600/70 hover:text-green-900"
                aria-label="Zamknij"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex-1">
            <CreateCarCard action="/admin/cars" />
          </div>
        </div>
      </div>
    </div>
  );
};

CreateCarPage.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default CreateCarPage;
