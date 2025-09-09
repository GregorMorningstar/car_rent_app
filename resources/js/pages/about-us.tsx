import LandingLayout from '@/layouts/landing-layout';

export default function AboutUs() {
  return (
    <LandingLayout title="O nas">
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">O nas</h1>
          <p className="text-muted-foreground leading-relaxed">
            Tu dodaj opis firmy. Możesz opowiedzieć o flocie, misji i zespole.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border p-5 bg-card">
              <h3 className="font-semibold mb-2">Doświadczenie</h3>
              <p className="text-sm text-muted-foreground">X lat na rynku wynajmu.</p>
            </div>
            <div className="rounded-xl border p-5 bg-card">
              <h3 className="font-semibold mb-2">Flota</h3>
              <p className="text-sm text-muted-foreground">Nowe, regularnie serwisowane auta.</p>
            </div>
            <div className="rounded-xl border p-5 bg-card">
              <h3 className="font-semibold mb-2">Wsparcie</h3>
              <p className="text-sm text-muted-foreground">Pomoc 24/7 dla klientów.</p>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}