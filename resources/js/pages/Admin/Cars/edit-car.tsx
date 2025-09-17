type EditCarFormData = {
  registration_number: string;
  vin: string;
  production_date: string;
  brand: string;
  model: string;
  color: string;
  mileage: string | number;
  fuel_type: string;
  power: string | number;
  seats: string | number;
  doors: string | number;
  price_per_day: string | number;
  description: string;
  main_image: File | null;
  remove_image: boolean;
};

// Prosta walidacja frontowa
function validateCarForm(data: EditCarFormData) {
  const errors: Partial<Record<keyof EditCarFormData, string>> = {};
  if (!data.registration_number) errors.registration_number = 'Numer rejestracyjny jest wymagany.';
  if (!data.vin) errors.vin = 'VIN jest wymagany.';
  if (!data.brand) errors.brand = 'Marka jest wymagana.';
  if (!data.model) errors.model = 'Model jest wymagana.';
  if (!data.price_per_day || isNaN(Number(data.price_per_day))) errors.price_per_day = 'Cena musi być liczbą.';
  // Możesz dodać więcej reguł według potrzeb
  return errors;
}
// Funkcja pomocnicza do formatu daty na potrzeby inputa typu date
function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  if (dateStr.includes('T')) {
    return dateStr.split('T')[0];
  }
  if (dateStr.includes(' ')) {
    return dateStr.split(' ')[0];
  }
  return dateStr;
}
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';

type Car = {
  id: number;
  registration_number: string;
  vin: string;
  production_date?: string | null;
  brand: string;
  model: string;
  color?: string | null;
  mileage?: number | null;
  fuel_type?: string | null;
  power?: number | null;
  seats?: number | null;
  doors?: number | null;
  price_per_day: string | number;
  description?: string | null;
  image_path?: string | null;
};

interface PageProps {
  car: Car;
  flash?: { success?: string };
  [key: string]: unknown;
}

const EditCarPage: React.FC & { layout?: (page: React.ReactNode) => React.ReactNode } = () => {
  const { props } = usePage<PageProps>();
  const { car, flash } = props;

  type EditCarFormData = {
    registration_number: string;
    vin: string;
    production_date: string;
    brand: string;
    model: string;
    color: string;
    mileage: string | number;
    fuel_type: string;
    power: string | number;
    seats: string | number;
    doors: string | number;
    price_per_day: string | number;
    description: string;
    main_image: File | null;
    remove_image: boolean;
  };

  const { data, setData, errors, processing, put, progress } = useForm<EditCarFormData>({
    registration_number: car.registration_number || '',
    vin: car.vin || '',
    production_date: car.production_date || '',
    brand: car.brand || '',
    model: car.model || '',
    color: car.color || '',
    mileage: car.mileage ?? '',
    fuel_type: car.fuel_type || '',
    power: car.power ?? '',
    seats: car.seats ?? '',
    doors: car.doors ?? '',
    price_per_day: car.price_per_day,
    description: car.description || '',
    main_image: null,
    remove_image: false,
  });

  const [showImageModal, setShowImageModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(car.image_path || null);

  const [localErrors, setLocalErrors] = useState<Partial<Record<keyof EditCarFormData, string>>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCarForm(data);
    setLocalErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      if (k === 'main_image' && !v) return;
      formData.append(k, String(v));
    });
    if (data.main_image instanceof File) {
      formData.set('main_image', data.main_image);
    }
    formData.append('_method', 'PUT');
    router.post(`/admin/cars/${car.id}`, formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setShowImageModal(false);
        router.get('/admin/cars');
      },
    });
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData('main_image', file);
    if (file) {
      const url = URL.createObjectURL(file);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(url);
      setData('remove_image', false);
    }
  };

  const removeImage = () => {
    setData('main_image', null);
    setData('remove_image', true);
    if (preview && !car.image_path?.startsWith('blob:')) {
      // Keep original for display until submit
    } else {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-6 px-6 md:px-8">
      <Head title={`Edytuj samochód #${car.id}`} />
      <h1 className="text-2xl font-semibold mb-2">Edytuj samochód</h1>
      {flash?.success && (
        <div className="mb-4 rounded border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-700">
          {flash.success}
        </div>
      )}
      <form onSubmit={submit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Nr rejestracyjny" error={localErrors.registration_number || errors.registration_number}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.registration_number}
              onChange={e => setData('registration_number', e.target.value)}
            />
          </Field>
          <Field label="VIN" error={localErrors.vin || errors.vin}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.vin}
              onChange={e => setData('vin', e.target.value)}
            />
          </Field>
          <Field label="Data produkcji" error={localErrors.production_date || errors.production_date}>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.production_date ? formatDate(data.production_date) : ''}
              onChange={e => setData('production_date', e.target.value)}
            />
          </Field>
          <Field label="Marka" error={localErrors.brand || errors.brand}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.brand}
              onChange={e => setData('brand', e.target.value)}
            />
          </Field>
          <Field label="Model" error={localErrors.model || errors.model}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.model}
              onChange={e => setData('model', e.target.value)}
            />
          </Field>
          <Field label="Kolor" error={localErrors.color || errors.color}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.color}
              onChange={e => setData('color', e.target.value)}
            />
          </Field>
          <Field label="Przebieg" error={localErrors.mileage || errors.mileage}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.mileage}
              onChange={e => setData('mileage', e.target.value)}
            />
          </Field>
          <Field label="Paliwo" error={localErrors.fuel_type || errors.fuel_type}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.fuel_type}
              onChange={e => setData('fuel_type', e.target.value)}
            />
          </Field>
          <Field label="Moc" error={localErrors.power || errors.power}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.power}
              onChange={e => setData('power', e.target.value)}
            />
          </Field>
          <Field label="Miejsca" error={localErrors.seats || errors.seats}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.seats}
              onChange={e => setData('seats', e.target.value)}
            />
          </Field>
          <Field label="Drzwi" error={localErrors.doors || errors.doors}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.doors}
              onChange={e => setData('doors', e.target.value)}
            />
          </Field>
          <Field label="Cena / dzień (PLN)" error={localErrors.price_per_day || errors.price_per_day}>
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={data.price_per_day}
              onChange={e => setData('price_per_day', e.target.value)}
            />
          </Field>
        </div>

  <Field label="Opis" error={localErrors.description || errors.description}>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm min-h-[120px]"
              value={data.description}
              onChange={e => setData('description', e.target.value)}
            />
        </Field>

        <div className="space-y-2">
          <label className="text-xs font-medium">Zdjęcie główne</label>
          <div className="flex items-start gap-4">
            <div className="h-24 w-40 border rounded overflow-hidden bg-muted/40 flex items-center justify-center">
              {preview ? (
                <img src={preview} className="h-full w-full object-cover" alt="Podgląd" />
              ) : (
                <span className="text-xs text-muted-foreground px-2 text-center">Brak zdjęcia</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowImageModal(true)}
                className="px-3 py-1.5 text-xs rounded border bg-white hover:bg-muted transition"
              >
                Zmień / Ustaw zdjęcie
              </button>
              {preview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-1.5 text-xs rounded border text-red-600 hover:bg-red-50 transition"
                >
                  Usuń zdjęcie
                </button>
              )}
            </div>
          </div>
        </div>

        {progress && (
          <div className="text-xs text-muted-foreground">
            Upload: {progress.percentage}%
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={processing}
            className="rounded bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {processing ? 'Zapisywanie...' : 'Zapisz zmiany'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Usunąć ten samochód?')) {
                router.delete(`/admin/cars/${car.id}`);
              }
            }}
            className="rounded border px-5 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Usuń
          </button>
        </div>
      </form>

      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowImageModal(false)}
          />
            <div className="relative z-10 w-full max-w-md rounded-lg bg-white shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Zmień zdjęcie</h2>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="mb-4 w-full text-sm"
              />
              {preview && (
                <div className="h-40 w-full border rounded overflow-hidden mb-4">
                  <img src={preview} className="h-full w-full object-cover" alt="Podgląd" />
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-3 py-1.5 text-sm rounded border hover:bg-muted"
                >
                  Zamknij
                </button>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

const Field: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <label className="flex flex-col gap-1">
    <span className="text-xs font-medium">{label}</span>
    {children}
    {error && <span className="text-[11px] text-red-600">{error}</span>}
  </label>
);

EditCarPage.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default EditCarPage;
