import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

// Dane formularza (wraz z plikami)
type FormDataType = {
  registration_number: string;
  vin: string;
  production_date: string;
  brand: string;
  model: string;
  color: string;
  mileage: number | string;
  fuel_type: string;
  power: number | string;
  seats: number | string;
  doors: number | string;
  price_per_day: number | string;
  description: string;
  main_image: File | null;
  gallery: File[];
};

type CreateCarCardProps = {
  action?: string; // domyślnie /admin/cars
};

const CreateCarCard: React.FC<CreateCarCardProps> = ({ action = '/admin/cars' }) => {
  const mainInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm<FormDataType>({
    registration_number: '',
    vin: '',
    production_date: '',
    brand: '',
    model: '',
    color: '',
    mileage: '',
    fuel_type: '',
    power: '',
    seats: '',
    doors: '',
    price_per_day: '',
    description: '',
    main_image: null,
    gallery: [],
  });

  // Podglądy obrazków
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const mainPreview = useMemo(
    () => (data.main_image ? URL.createObjectURL(data.main_image) : ''),
    [data.main_image]
  );

  useEffect(() => {
    const urls = data.gallery.map((f) => URL.createObjectURL(f));
    setGalleryPreviews(urls);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [data.gallery]);

  useEffect(() => {
    return () => {
      if (mainPreview) URL.revokeObjectURL(mainPreview);
    };
  }, [mainPreview]);

  // Dodawanie wielu plików do galerii (dokłada, nie nadpisuje)
  const addToGallery = (files?: FileList | File[]) => {
    if (!files) return;
    const incoming = Array.from(files);

    // unikaj duplikatów (po name+size+lastModified)
    const existingMap = new Set(
      data.gallery.map((f) => `${f.name}-${f.size}-${f.lastModified}`)
    );

    const deduped = incoming.filter(
      (f) => !existingMap.has(`${f.name}-${f.size}-${f.lastModified}`)
    );

    // opcjonalny limit 20 zdjęć
    const next = [...data.gallery, ...deduped].slice(0, 20);
    setData('gallery', next);
  };

  const removeFromGallery = (index: number) => {
    const next = [...data.gallery];
    next.splice(index, 1);
    setData('gallery', next);
  };

  const setAsMainFromGallery = (index: number) => {
    const file = data.gallery[index];
    if (file) setData('main_image', file);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(action, {
      forceFormData: true,
      onSuccess: () => {
        reset();
        if (mainInputRef.current) mainInputRef.current.value = '';
        if (galleryInputRef.current) galleryInputRef.current.value = '';
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Dodaj samochód</h1>

      <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORMULARZ */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Registration number"
              error={errors.registration_number}
            >
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.registration_number}
                onChange={(e) => setData('registration_number', e.target.value)}
                placeholder="np. WI 1234A"
              />
            </FormField>

            <FormField label="VIN" error={errors.vin}>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.vin}
                onChange={(e) => setData('vin', e.target.value)}
                placeholder="np. 1HGCM82633A004352"
              />
            </FormField>

            <FormField label="Production date" error={errors.production_date}>
              <input
                type="date"
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.production_date}
                onChange={(e) => setData('production_date', e.target.value)}
              />
            </FormField>

            <FormField label="Brand" error={errors.brand}>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.brand}
                onChange={(e) => setData('brand', e.target.value)}
                placeholder="np. Toyota"
              />
            </FormField>

            <FormField label="Model" error={errors.model}>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.model}
                onChange={(e) => setData('model', e.target.value)}
                placeholder="np. Corolla"
              />
            </FormField>

            <FormField label="Color" error={errors.color}>
              <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.color}
                onChange={(e) => setData('color', e.target.value)}
                placeholder="np. Black"
              />
            </FormField>

            <FormField label="Fuel type" error={errors.fuel_type}>
              <select
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.fuel_type}
                onChange={(e) => setData('fuel_type', e.target.value)}
              >
                <option value="">Wybierz</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
                <option value="lpg">LPG</option>
              </select>
            </FormField>

            <FormField label="Mileage (km)" error={errors.mileage}>
              <input
                type="number"
                min={0}
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.mileage}
                onChange={(e) => setData('mileage', e.target.value)}
              />
            </FormField>

            <FormField label="Power (HP)" error={errors.power}>
              <input
                type="number"
                min={1}
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.power}
                onChange={(e) => setData('power', e.target.value)}
              />
            </FormField>

            <FormField label="Seats" error={errors.seats}>
              <input
                type="number"
                min={1}
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.seats}
                onChange={(e) => setData('seats', e.target.value)}
              />
            </FormField>

            <FormField label="Doors" error={errors.doors}>
              <input
                type="number"
                min={1}
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.doors}
                onChange={(e) => setData('doors', e.target.value)}
              />
            </FormField>

            <FormField label="Price per day (PLN)" error={errors.price_per_day}>
              <input
                type="number"
                step="0.01"
                min={0}
                className="mt-1 w-full rounded border px-3 py-2"
                value={data.price_per_day}
                onChange={(e) => setData('price_per_day', e.target.value)}
              />
            </FormField>
          </div>

          <FormField label="Description" error={errors.description}>
            <textarea
              className="mt-1 w-full rounded border px-3 py-2"
              rows={5}
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Krótki opis pojazdu"
            />
          </FormField>

          {/* Zdjęcia */}
          <div className="grid grid-cols-1 gap-4">
            {/* Główne zdjęcie */}
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Główne zdjęcie</h3>
                {mainPreview && <span className="text-xs text-gray-500">Podgląd</span>}
              </div>
              <input
                ref={mainInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => setData('main_image', e.target.files?.[0] ?? null)}
              />
              {errors.main_image && (
                <p className="text-sm text-red-600 mt-2">{errors.main_image}</p>
              )}
              {mainPreview && (
                <img
                  src={mainPreview}
                  alt="Main preview"
                  className="mt-3 w-full aspect-video object-cover rounded"
                />
              )}
            </div>

            {/* Galeria */}
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Galeria (miniatury)</h3>
                {galleryPreviews.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {galleryPreviews.length} plików
                  </span>
                )}
              </div>

              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => addToGallery(e.target.files ?? undefined)}
              />

              {errors.gallery && (
                <p className="text-sm text-red-600 mt-2">{errors.gallery}</p>
              )}

              {galleryPreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {galleryPreviews.map((src, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={src}
                        alt={`Gallery ${i + 1}`}
                        className="w-full aspect-square object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition rounded" />
                      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          type="button"
                          onClick={() => removeFromGallery(i)}
                          className="px-2 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                          title="Usuń"
                        >
                          Usuń
                        </button>
                        <button
                          type="button"
                          onClick={() => setAsMainFromGallery(i)}
                          className="px-2 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                          title="Ustaw jako główne"
                        >
                          Główne
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tip: możesz dodać zdjęcia ponownie – zostaną dołączone, nie nadpisane */}
              <p className="mt-2 text-xs text-gray-500">
                Możesz wybierać pliki wielokrotnie – nowe zdjęcia zostaną dołączone
                do galerii (limit 20).
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-2.5 rounded text-white bg-[#F53003] hover:bg-[#d72600] disabled:opacity-60"
          >
            {processing ? 'Zapisywanie…' : 'Zapisz samochód'}
          </button>
        </div>

        {/* PODGLĄD KARTY */}
        <div className="space-y-4">
          <CarCard
            registration_number={data.registration_number}
            vin={data.vin}
            production_date={data.production_date}
            brand={data.brand}
            model={data.model}
            color={data.color}
            mileage={Number(data.mileage) || 0}
            fuel_type={data.fuel_type}
            power={Number(data.power) || 0}
            seats={Number(data.seats) || 0}
            doors={Number(data.doors) || 0}
            price_per_day={Number(data.price_per_day) || 0}
            description={data.description}
            mainImageUrl={mainPreview || undefined}
            galleryUrls={galleryPreviews}
          />
        </div>
      </form>
    </div>
  );
};

// Mały helper do etykiet i błędów
const FormField: React.FC<{ label: string; error?: string; children: React.ReactNode }> = ({ label, error, children }) => (
  <label className="block">
    <span className="block text-sm font-medium">{label}</span>
    {children}
    {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
  </label>
);

/**
 * Karta z danymi pojazdu (podgląd)
 */
type CarCardProps = Omit<FormDataType, 'main_image' | 'gallery'> & {
  mainImageUrl?: string;
  galleryUrls?: string[];
};

const CarCard: React.FC<CarCardProps> = ({
  registration_number,
  vin,
  production_date,
  brand,
  model,
  color,
  mileage,
  fuel_type,
  power,
  seats,
  doors,
  price_per_day,
  description,
  mainImageUrl,
  galleryUrls = [],
}) => (
  <div className="rounded-lg shadow bg-white overflow-hidden max-w-lg border">
    {mainImageUrl ? (
      <img src={mainImageUrl} alt={`${brand || 'Car'} ${model || ''}`} className="w-full h-48 object-cover" />
    ) : (
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">Brak zdjęcia</div>
    )}
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-1">{brand || '—'} {model || ''}</h2>
      <div className="text-sm text-gray-500 mb-2">
        {registration_number || '—'} {vin ? `• VIN: ${vin}` : ''}
      </div>
      <div className="mb-2">
        <span className="font-medium">Rok produkcji:</span> {production_date || '—'}
      </div>
      <div className="mb-2 flex flex-wrap gap-2 text-xs">
        <span className="bg-gray-100 px-2 py-1 rounded">Kolor: {color || '—'}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">Paliwo: {fuel_type || '—'}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">Przebieg: {mileage || 0} km</span>
        <span className="bg-gray-100 px-2 py-1 rounded">Moc: {power || 0} KM</span>
        <span className="bg-gray-100 px-2 py-1 rounded">Miejsca: {seats || 0}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">Drzwi: {doors || 0}</span>
      </div>
      <div className="mb-2 text-[#F53003] font-bold text-lg">{price_per_day ? `${price_per_day} PLN/dzień` : '—'}</div>
      <p className="text-sm text-gray-700 mb-2">{description || '—'}</p>
      {galleryUrls.length > 0 && (
        <div className="grid grid-cols-4 gap-1 mt-2">
          {galleryUrls.map((url, i) => (
            <img key={i} src={url} alt={`Gallery ${i + 1}`} className="w-full h-16 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  </div>
);

export default CreateCarCard;
export { CarCard };
