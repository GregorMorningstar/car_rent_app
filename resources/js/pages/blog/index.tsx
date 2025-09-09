import { useMemo, useState } from 'react';
import LandingLayout from '@/layouts/landing-layout';
import ArticleCard, { type ArticleSize } from '@/pages/blog/article';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tag: string;
  size: ArticleSize;
  href: string;
}

const allArticles: Article[] = [
  {
    id: 1,
    title: 'Najlepsze auta na weekend',
    excerpt: 'Przegląd modeli idealnych na krótki wypad za miasto.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    date: '2025-08-12',
    tag: 'Poradnik',
    size: 'lg',
    href: '#',
  },
  {
    id: 2,
    title: 'Jak obniżyć koszt wynajmu?',
    excerpt: 'Kilka praktycznych wskazówek jak płacić mniej.',
    image:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    date: '2025-07-30',
    tag: 'Finanse',
    size: 'md',
    href: '#',
  },
  {
    id: 3,
    title: 'SUV czy sedan?',
    excerpt: 'Który typ nadwozia wybrać do swoich potrzeb.',
    image:
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80',
    date: '2025-07-18',
    tag: 'Porównanie',
    size: 'sm',
    href: '#',
  },
  {
    id: 4,
    title: 'Top 5 miejskich aut',
    excerpt: 'Małe, zwinne i oszczędne – nasze propozycje.',
    image:
      'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1200&q=80',
    date: '2025-06-29',
    tag: 'Ranking',
    size: 'md',
    href: '#',
  },
  {
    id: 5,
    title: 'Wynajem na wakacje',
    excerpt: 'O czym pamiętać planując wyjazd samochodem.',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    date: '2025-06-10',
    tag: 'Podróże',
    size: 'lg',
    href: '#',
  },
  {
    id: 6,
    title: 'Ubezpieczenie w cenie',
    excerpt: 'Co obejmuje i kiedy działa.',
    image:
      'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1200&q=80',
    date: '2025-05-27',
    tag: 'Ubezpieczenia',
    size: 'sm',
    href: '#',
  },
  {
    id: 7,
    title: 'Elektryki w ofercie',
    excerpt: 'Jak wygląda ładowanie i zasięg?',
    image:
      'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92f?auto=format&fit=crop&w=1200&q=80',
    date: '2025-05-08',
    tag: 'Elektryczne',
    size: 'md',
    href: '#',
  },
  {
    id: 8,
    title: 'Premium na specjalne okazje',
    excerpt: 'Luksusowe modele na ślub i event.',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    date: '2025-04-22',
    tag: 'Premium',
    size: 'lg',
    href: '#',
  },
  {
    id: 9,
    title: 'Regulamin w pigułce',
    excerpt: 'Najważniejsze punkty umowy najmu.',
    image:
      'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=1200&q=80',
    date: '2025-04-05',
    tag: 'Regulamin',
    size: 'sm',
    href: '#',
  },
  {
    id: 10,
    title: 'Zima a opony',
    excerpt: 'Dlaczego sezonowa wymiana jest ważna.',
    image:
      'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1200&q=80',
    date: '2025-03-19',
    tag: 'Bezpieczeństwo',
    size: 'md',
    href: '#',
  },
  {
    id: 11,
    title: 'Pickup na budowę',
    excerpt: 'Moc i ładowność w praktyce.',
    image:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    date: '2025-03-01',
    tag: 'Praca',
    size: 'sm',
    href: '#',
  },
  {
    id: 12,
    title: 'Jak działa kaucja?',
    excerpt: 'Zwrotne zabezpieczenie – fakty i mity.',
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    date: '2025-02-14',
    tag: 'Finanse',
    size: 'md',
    href: '#',
  },
];

const PAGE_SIZE = 5; // 2 rzędy, łącznie 5 kafelków

export default function BlogIndex() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allArticles.length / PAGE_SIZE);

  // Elementy na bieżącej stronie
  const items = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allArticles.slice(start, start + PAGE_SIZE);
  }, [page]);

  // Losowy układ 2/3 lub 3/2 – ustalany per strona
  const layoutTopCount = useMemo(() => (Math.random() < 0.5 ? 2 : 3), [page]);

  // Losowe rozmiary kafelków (Windows-like)
  const randomized = useMemo(() => {
    const pick = (): ArticleSize => {
      const r = Math.random();
      if (r < 0.45) return 'sm';
      if (r < 0.8) return 'md';
      return 'lg';
    };
    return items.map(a => ({ ...a, size: pick() as ArticleSize }));
  }, [items]);

  // Stały układ: 2 u góry, 3 na dole (ostatnia strona może mieć mniej)
  const topCount = Math.min(2, randomized.length);
  const bottomCount = Math.max(0, Math.min(3, randomized.length - topCount));
  const topItems = randomized.slice(0, topCount);
  const bottomItems = randomized.slice(topCount, topCount + bottomCount);

  const prev = () => setPage(p => Math.max(1, p - 1));
  const next = () => setPage(p => Math.min(totalPages, p + 1));

  return (
    <LandingLayout title="Blog">
      <section className="pt-16 md:pt-20 pb-20 bg-neutral-100">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Blog
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Strona {page} z {totalPages}.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={prev}
                disabled={page === 1}
                className="px-3 py-2 rounded border bg-card hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Poprzednia
              </button>
              <button
                onClick={next}
                disabled={page === totalPages}
                className="px-3 py-2 rounded border bg-card hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Następna
              </button>
            </div>
          </div>

          {/* Rząd 1: zawsze 2 kafelki */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            {topItems.map(a => (
              <ArticleCard
                key={a.id}
                id={a.id}
                title={a.title}
                excerpt={a.excerpt}
                image={a.image}
                date={a.date}
                tag={a.tag}
                href={`/blog/${a.id}`}
                size={a.size}
              />
            ))}
          </div>

          {/* Rząd 2: zawsze do 3 kafelków (w sumie 5 na stronę) */}
          <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {bottomItems.map(a => (
              <ArticleCard
                key={a.id}
                id={a.id}
                title={a.title}
                excerpt={a.excerpt}
                image={a.image}
                date={a.date}
                tag={a.tag}
                href={`/blog/${a.id}`}
                size={a.size}
              />
            ))}
          </div>

          {/* Paginacja mobilna na dole */}
          <div className="mt-8 flex md:hidden items-center justify-between">
            <button
              onClick={prev}
              disabled={page === 1}
              className="px-4 py-2 rounded border bg-card hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Poprzednia
            </button>
            <span className="text-sm text-muted-foreground">
              {page} / {totalPages}
            </span>
            <button
              onClick={next}
              disabled={page === totalPages}
              className="px-4 py-2 rounded border bg-card hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Następna
            </button>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
