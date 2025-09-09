import React from 'react';
import { Link } from '@inertiajs/react';

export type ArticleSize = 'sm' | 'md' | 'lg';

export interface ArticleCardProps {
  id: number | string;
  title: string;
  excerpt: string;
  image: string;
  date: string; // ISO string
  tag?: string;
  href?: string; // domyślnie /blog/{id}
  size?: ArticleSize; // wpływa na wysokość kafelka
  className?: string;
}

const sizeH: Record<ArticleSize, string> = {
  sm: 'h-44',
  md: 'h-56',
  lg: 'h-72',
};

function cn(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(' ');
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  image,
  date,
  tag,
  href,
  size = 'md',
  className,
}: ArticleCardProps) {
  const to = href ?? `/blog/${id}`;
  const h = sizeH[size] ?? sizeH.md;

  return (
    <article
      role="article"
      className={cn(
        'group relative overflow-hidden rounded-xl border bg-card shadow-sm transition',
        'hover:shadow-md hover:-translate-y-0.5 focus-within:shadow-md',
        className
      )}
    >
      <Link href={to} className="block focus:outline-none" aria-label={title}>
        <div className={cn('relative', h)}>
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {tag && (
              <span className="inline-flex items-center rounded bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-900">
                {tag}
              </span>
            )}
            <h3 className="mt-2 text-white text-lg font-semibold leading-tight line-clamp-2 drop-shadow">
              {title}
            </h3>
            <p className="mt-1 text-white/85 text-xs line-clamp-2">
              {excerpt}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground bg-background/80 backdrop-blur">
        <time dateTime={date}>{new Date(date).toLocaleDateString('pl-PL')}</time>
        <Link
          href={to}
          className="text-primary font-medium hover:underline focus:underline focus:outline-none"
        >
          Szczegóły
        </Link>
      </div>
    </article>
  );
}