import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import FullSplitSection from '@/components/landing/FullSplitSection';
import CaruselaCarInfo from '@/components/carusela-car-info';
import { Car } from "@/components/carusela-car-info";

type WelcomeProps = {
  cars: Car[];
};

export default function Welcome({ cars }: WelcomeProps) {
  const { auth } = usePage<SharedData>().props;

  return (
    <LandingLayout title="Rent4u">
      {/* Sekcja hero (pełna wysokość, więc bez dodatkowego paddingu pionowego) */}
      <section className="w-full">
        <FullSplitSection />
      </section>

      {/* Sekcja karuzeli */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
            Wybrane modele
          </h2>
            <CaruselaCarInfo cars={Array.isArray(cars) ? cars : []} />
        </div>
      </section>

      {/* Przykładowa sekcja na przyszłe treści */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h3 className="mb-4 text-xl font-semibold md:text-2xl">Sekcja dodatkowa</h3>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Tutaj możesz dodać kolejne elementy strony: FAQ, opinie klientów, CTA, formularz kontaktowy itp.
          </p>
        </div>
      </section>
    </LandingLayout>
  );
}
