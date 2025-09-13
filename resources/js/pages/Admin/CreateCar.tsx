import AdminLayout from '../../layouts/AdminLayout';
import CreateCarCard from '@/components/create-car_card';



const CreateCar: React.FC & { layout?: (page: React.ReactNode) => React.ReactNode } = () => {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold mb-4">Dodaj samochód</h1>
        <p>Witaj w panelu dodawania samochodu.</p>
      </div>
      <CreateCarCard action="/admin/cars" />
    </AdminLayout>
  );
};

export default CreateCar;
