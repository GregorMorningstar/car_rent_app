import { Head, useForm } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';

export default function Contact() {
  const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('contakt.message.form'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  const orgLdJson = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rent4u Sp. z o.o.',
    url: typeof window !== 'undefined' ? window.location.origin : undefined,
    telephone: '+48 123 456 789',
    email: 'kontakt@rent4u.pl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Kościuszki 12',
      addressLocality: 'Jasło',
      postalCode: '38-200',
      addressCountry: 'PL',
    },
  };

  return (
    <LandingLayout title="Kontakt">
      <Head>
        <meta
          name="description"
          content="Skontaktuj się z Rent4u – adres: ul. Kościuszki 12, 38-200 Jasło. Telefon: +48 123 456 789, e-mail: kontakt@rent4u.pl."
        />
        <script type="application/ld+json">{JSON.stringify(orgLdJson)}</script>
      </Head>

      {/* Sekcja z nowoczesnym tłem */}
      <section
        className="relative w-full overflow-hidden"
        style={{ marginTop: 'calc(var(--nav-h, 56px) + 3vh)' }}
      >
        {/* Gradient bazowy */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />
        {/* Radialne akcenty kolorystyczne */}
        <div className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(40%_40%_at_20%_10%,rgba(245,48,3,0.12),transparent_60%),radial-gradient(30%_30%_at_85%_5%,rgba(59,130,246,0.10),transparent_60%),radial-gradient(35%_35%_at_50%_100%,rgba(16,185,129,0.12),transparent_60%)]" />
        {/* Subtelna siatka */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#0000000f 1px, transparent 1px), linear-gradient(90deg, #0000000f 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="mx-auto max-w-6xl px-4 md:px-6 py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Kontakt</h1>

          {/* Dane firmy + mapa */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Dane firmy */}
            <div className="rounded-xl border bg-white/70 backdrop-blur-md p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Dane firmy</h2>
              <address
                className="space-y-3 text-sm not-italic"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <p>
                  <span className="block text-muted-foreground">Nazwa</span>
                  <span className="font-medium" itemProp="name">
                    Rent4u Sp. z o.o.
                  </span>
                </p>
                <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span className="block text-muted-foreground">Adres</span>
                  <span className="font-medium" itemProp="streetAddress">ul. Kościuszki 12</span>
                  <br />
                  <span itemProp="postalCode">38-200</span>{' '}
                  <span itemProp="addressLocality">Jasło</span>,{' '}
                  <span itemProp="addressCountry">Polska</span>
                </p>
                <p>
                  <span className="block text-muted-foreground">Telefon</span>
                  <a href="tel:+48123456789" itemProp="telephone" className="text-primary hover:underline">
                    +48 123 456 789
                  </a>
                </p>
                <p>
                  <span className="block text-muted-foreground">E-mail</span>
                  <a
                    href="mailto:kontakt@rent4u.pl"
                    itemProp="email"
                    className="text-primary hover:underline"
                  >
                    kontakt@rent4u.pl
                  </a>
                </p>
                <p className="text-muted-foreground text-xs">
                  Godziny otwarcia: Pon–Pt 9:00–17:00, Sob 10:00–14:00
                </p>
              </address>
            </div>

            {/* Mapa */}
            <div className="rounded-xl border overflow-hidden bg-white/70 backdrop-blur-md shadow-md">
              <h2 className="text-xl font-semibold mb-0 px-6 pt-6 md:sr-only">Lokalizacja na mapie</h2>
              <div className="aspect-video md:h-full">
                <iframe
                  title="Mapa: Jasło"
                  src="https://maps.google.com/maps?q=Jas%C5%82o%2C%20Polska&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jas%C5%82o%2C%20Polska"
                  target="_blank"
                  rel="noopener nofollow"
                  className="text-sm text-primary hover:underline"
                  aria-label="Otwórz lokalizację Jasło w Google Maps"
                >
                  Otwórz w Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Formularz */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-center mb-6">Napisz do nas</h2>
            <div className="mx-auto max-w-2xl">
              <form onSubmit={submit} className="rounded-xl border bg-white/70 backdrop-blur-md p-6 space-y-5 shadow-md">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Imię i nazwisko</label>
                    <input
                      type="text"
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      required
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">E-mail</label>
                    <input
                      type="email"
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      required
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Telefon (opcjonalnie)</label>
                    <input
                      type="tel"
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                      placeholder="+48 ..."
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                  </div>
                  <div className="hidden md:block" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Wiadomość</label>
                  <textarea
                    className="min-h-[140px] w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                    required
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-white text-sm font-semibold shadow hover:bg-primary/90 disabled:opacity-60"
                  >
                    {processing ? 'Wysyłanie…' : 'Wyślij wiadomość'}
                  </button>
                </div>

                {recentlySuccessful && (
                  <p className="text-center text-sm text-green-600" aria-live="polite">
                    Wiadomość została wysłana.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
