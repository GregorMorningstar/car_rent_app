import AdminLayout from "@/layouts/AdminLayout";

type Car = {
  id: number;
  name?: string;
  brand?: string;
  model?: string;
  image_path?: string | null;
  created_at?: string | null;
  registration_number?: string;
  vin?: string;
  production_date?: string | null;
  color?: string | null;
  mileage?: number | null;
  fuel_type?: string | null;
  power?: number | null;
  seats?: number | null;
  doors?: number | null;
  price_per_day?: string | number | null;
  description?: string | null;
};

export default function ShowCar({ car }: { car: Car }) {
  return (
    <AdminLayout title={`Szczegóły samochodu ${car.id}`}>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md mx-auto flex flex-col items-center">
          {car.image_path ? (
            <img
              src={car.image_path}
              alt="Zdjęcie samochodu"
              className="w-64 h-40 object-cover rounded-lg mb-6 shadow"
            />
          ) : (
            <div className="w-64 h-40 flex items-center justify-center bg-gray-100 rounded-lg mb-6 text-gray-400 text-lg">
              Brak zdjęcia
            </div>
          )}
          <h1 className="text-2xl font-bold mb-2 text-center">{car.brand} {car.model}</h1>
          <div className="text-sm text-gray-500 mb-4">ID: {car.id}</div>
          <div className="w-full space-y-2">
            {car.name && <div className="flex justify-between"><span className="font-medium">Nazwa:</span> <span>{car.name}</span></div>}
            {car.brand && <div className="flex justify-between"><span className="font-medium">Marka:</span> <span>{car.brand}</span></div>}
            {car.model && <div className="flex justify-between"><span className="font-medium">Model:</span> <span>{car.model}</span></div>}
            {car.registration_number && <div className="flex justify-between"><span className="font-medium">Nr rej.:</span> <span>{car.registration_number}</span></div>}
            {car.vin && <div className="flex justify-between"><span className="font-medium">VIN:</span> <span>{car.vin}</span></div>}
            {car.production_date && <div className="flex justify-between"><span className="font-medium">Data produkcji:</span> <span>{car.production_date.split('T')[0]}</span></div>}
            {car.color && <div className="flex justify-between"><span className="font-medium">Kolor:</span> <span>{car.color}</span></div>}
            {car.mileage !== undefined && car.mileage !== null && <div className="flex justify-between"><span className="font-medium">Przebieg:</span> <span>{car.mileage} km</span></div>}
            {car.fuel_type && <div className="flex justify-between"><span className="font-medium">Paliwo:</span> <span>{car.fuel_type}</span></div>}
            {car.power !== undefined && car.power !== null && <div className="flex justify-between"><span className="font-medium">Moc:</span> <span>{car.power} KM</span></div>}
            {car.seats !== undefined && car.seats !== null && <div className="flex justify-between"><span className="font-medium">Miejsca:</span> <span>{car.seats}</span></div>}
            {car.doors !== undefined && car.doors !== null && <div className="flex justify-between"><span className="font-medium">Drzwi:</span> <span>{car.doors}</span></div>}
            {car.price_per_day !== undefined && car.price_per_day !== null && <div className="flex justify-between"><span className="font-medium">Cena / dzień:</span> <span>{Number(car.price_per_day).toFixed(2)} zł</span></div>}
            {car.description && <div className="flex flex-col"><span className="font-medium">Opis:</span> <span className="text-gray-700 mt-1">{car.description}</span></div>}
            {car.created_at && <div className="flex justify-between"><span className="font-medium">Dodano:</span> <span>{new Date(car.created_at).toLocaleDateString('pl-PL')}</span></div>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
