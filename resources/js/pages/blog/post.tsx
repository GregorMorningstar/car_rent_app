// filepath: c:\xampp\htdocs\CarRentApp\resources\js\pages\blog\show.tsx
import LandingLayout from '@/layouts/landing-layout';
import { usePage } from '@inertiajs/react';

export default function BlogShow() {
  const { id, article } = usePage<{ id: number; article?: any }>().props;

  return (
    <LandingLayout title="Szczegóły artykułu">
      <section className="pt-16 md:pt-20 pb-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Artykuł #{id}</h1>
          <p className="text-muted-foreground">
            Tu wyświetl treść artykułu z backendu (props.article).
          </p>
        </div>
      </section>
    </LandingLayout>
  );
}