import { useEffect, useMemo, useState } from 'react';
import LandingLayout from '@/layouts/landing-layout';
import PostCard from '@/components/post-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type UserRef = { id: number; name: string };
type Post = {
  id: number;
  title: string;
  content: string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  og_image?: string | null;
  canonical_url?: string | null;
  image_path?: string | null;
  user?: UserRef | null;
  created_at?: string | null;
};

const PAGE_SIZE = 5;

export default function BlogIndex({ posts }: { posts: Post[] }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.content || '').toLowerCase().includes(q)
    );
  }, [posts, query]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;

  useEffect(() => {
    setPage(1);
  }, [query]);

  // Elementy na bieżącej stronie
  const items = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [page, filtered]);

  // Stały układ: 2 u góry, 3 na dole (ostatnia strona może mieć mniej)
  const topCount = Math.min(2, items.length);
  const bottomCount = Math.max(0, Math.min(3, items.length - topCount));
  const topItems = items.slice(0, topCount);
  const bottomItems = items.slice(topCount, topCount + bottomCount);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <LandingLayout title="Blog">
      <section className="pt-16 md:pt-20 pb-20 bg-neutral-100">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Blog
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">Strona {page} z {totalPages}.</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Szukaj w tytułach i treści..."
                  className="pl-8 w-72"
                />
              </div>
              <div className="flex items-center gap-2">
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
          </div>

          {/* Rząd 1: zawsze 2 kafelki */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            {topItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Rząd 2: zawsze do 3 kafelków (w sumie 5 na stronę) */}
          <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {bottomItems.map((post) => (
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
              {page} / {totalPages || 1}
            </span>
            <button
              onClick={next}
              disabled={page === totalPages || totalPages === 0}
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
