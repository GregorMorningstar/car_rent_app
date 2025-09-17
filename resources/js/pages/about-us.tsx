import LandingLayout from '@/layouts/landing-layout';

export default function AboutUs() {
  return (
    <LandingLayout title="O nas">
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-6">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Nowoczesna wypożyczalnia samochodów</h1>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" alt="Rejestracja i podgląd dostępnych dat" className="rounded-xl shadow-lg w-full md:w-1/2 object-cover h-64 order-2 md:order-1" />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Nowoczesna flota</h2>
            <p className="text-gray-700 mb-2">Nasza wypożyczalnia oferuje szeroki wybór nowych i zadbanych samochodów – od miejskich kompaktów po luksusowe SUV-y. Dbamy o regularny serwis i bezpieczeństwo każdego pojazdu.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" alt="Rejestracja i podgląd dostępnych dat" className="rounded-xl shadow-lg w-full md:w-1/2 object-cover h-64 order-2 md:order-1" />
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-2xl font-semibold mb-2">Wynajem od 1 dnia</h2>
            <p className="text-gray-700 mb-2">Wypożycz samochód nawet na jeden dzień! Elastyczne terminy, szybka rezerwacja online i przejrzysty cennik. Wybierz daty, które Ci odpowiadają.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
          <img src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80" alt="Rejestracja klienta" className="rounded-xl shadow-lg w-full md:w-1/2 object-cover h-64" />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Szybka rejestracja</h2>
            <p className="text-gray-700 mb-2">Załóż konto w kilka minut i zyskaj dostęp do historii rezerwacji, faktur oraz specjalnych ofert. Intuicyjny panel klienta pozwala na łatwe zarządzanie wynajmem.</p>
          </div>
        </div>
        <div className="bg-primary/10 rounded-xl p-6 text-center mt-8">
          <h3 className="text-xl font-semibold mb-2">Zarezerwuj swój samochód już dziś!</h3>
          <p className="text-gray-700">Sprawdź dostępność, wybierz model i ciesz się komfortem podróży z naszą flotą.</p>
        </div>
      </div>
        </div>
      </section>
    </LandingLayout>
  );
}
