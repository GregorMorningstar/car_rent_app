import { useMemo, useState } from 'react';
import LandingLayout from '@/layouts/landing-layout';

import PostCard from '@/components/post-card';

// Przykładowe dane w formacie jak z bazy (model Post)
const allPosts = [
  {
    id: 1,
    title: 'Najlepsze auta na weekend',
    body: 'Przegląd modeli idealnych na krótki wypad za miasto. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae.',
    slug: 'najlepsze-auta-na-weekend',
    meta_title: 'Najlepsze auta na weekend - Blog',
    meta_description: 'Przegląd modeli idealnych na krótki wypad za miasto.',
    meta_keywords: 'auta, weekend, wyjazd',
    og_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    canonical_url: '',
    image_path: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    user: { id: 1, name: 'Jan Kowalski' },
    created_at: '2025-08-12',
  },
  {
    id: 2,
    title: 'Jak obniżyć koszt wynajmu?',
    body: 'Kilka praktycznych wskazówek jak płacić mniej. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    slug: 'jak-obnizyc-koszt-wynajmu',
    meta_title: 'Jak obniżyć koszt wynajmu? - Blog',
    meta_description: 'Kilka praktycznych wskazówek jak płacić mniej.',
    meta_keywords: 'wynajem, oszczędzanie, porady',
    og_image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    canonical_url: '',
    image_path: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    user: { id: 2, name: 'Anna Nowak' },
    created_at: '2025-07-30',
  },
];


const PAGE_SIZE = 5;

export default function BlogIndex() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allPosts.length / PAGE_SIZE);

  // Elementy na bieżącej stronie
  const items = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return allPosts.slice(start, start + PAGE_SIZE);
  }, [page]);

  // Stały układ: 2 u góry, 3 na dole (ostatnia strona może mieć mniej)
  const topCount = Math.min(2, items.length);
  const bottomCount = Math.max(0, Math.min(3, items.length - topCount));
  const topItems = items.slice(0, topCount);
  const bottomItems = items.slice(topCount, topCount + bottomCount);

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
            {topItems.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Rząd 2: zawsze do 3 kafelków (w sumie 5 na stronę) */}
          <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {bottomItems.map(post => (
              <PostCard key={post.id} post={post} />
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
