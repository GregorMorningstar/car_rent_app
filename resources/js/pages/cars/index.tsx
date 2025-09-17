import CaruselaCarInfo, { Car } from "@/components/carusela-car-info";
import LandingLayout from "@/layouts/landing-layout";
import { Head } from "@inertiajs/react";

interface Props {
  cars: Car[];
}

interface Props {
  cars: Car[];
}

export default function CarsIndexPage({ cars }: Props) {
  return (
    <LandingLayout title="Nasze samochody">
      <Head>
        <meta
          name="description"
          content="Przeglądaj naszą nowoczesną flotę samochodów do wynajęcia. Oferujemy szeroki wybór pojazdów – od ekonomicznych po luksusowe. Sprawdź dostępność i zarezerwuj już dziś!"
        />
      </Head>
      <main className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h1 className="text-4xl font-bold text-center">Nasze samochody</h1>
          <p className="text-center text-lg text-gray-700">
            Odkryj naszą różnorodną flotę samochodów do wynajęcia. Niezależnie od
            tego, czy potrzebujesz kompaktowego auta na miasto, przestronnego SUV-a
            na rodzinne wyjazdy, czy luksusowego pojazdu na specjalne okazje – mamy
            coś dla Ciebie. Wszystkie nasze samochody są nowe, regularnie
            serwisowane i gotowe, by zapewnić Ci komfortową i bezpieczną podróż.
          </p>
        </div>
      </main>
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md">
            <CaruselaCarInfo cars={Array.isArray(cars) ? cars : []} />
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}

