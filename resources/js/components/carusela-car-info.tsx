import { useRef, useCallback, useState, useEffect } from 'react';

interface Slide {
  id: number;
  src: string;
  title: string;
  desc: string;
}

const slides: Slide[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
    title: 'Sportowy czerwony',
    desc: 'Klasa premium'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80',
    title: 'SUV czarny',
    desc: 'Rodzinny komfort'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=900&q=80',
    title: 'Miejski kompakt',
    desc: 'Ekonomiczny wybór'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80',
    title: 'Luksusowa limuzyna',
    desc: 'Biznes klasa'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80',
    title: 'Kabriolet',
    desc: 'Na słoneczne dni'
  },
];

export default function CaruselaCarInfo() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  const scrollBySlide = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstSlide = track.querySelector<HTMLDivElement>('[data-slide]');
    if (!firstSlide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0');
    const slideWidth = firstSlide.getBoundingClientRect().width + gap;

    // Jeśli cofamy i jesteśmy blisko początku:
    if (dir === -1 && track.scrollLeft <= 0) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'auto' });
    }
    track.scrollBy({ left: dir * slideWidth, behavior: 'smooth' });
  }, []);

  // Auto-przewijanie
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const nearEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (nearEnd) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollBySlide(1);
      }
    }, 3000);
    return () => clearInterval(id);
  }, [paused, scrollBySlide]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Przyciski na desktopie */}
      <button
        type="button"
        onClick={() => scrollBySlide(-1)}
        className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background/70 p-2 shadow ring-1 ring-border backdrop-blur hover:bg-background md:inline-flex"
        aria-label="Poprzedni"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => scrollBySlide(1)}
        className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background/70 p-2 shadow ring-1 ring-border backdrop-blur hover:bg-background md:inline-flex"
        aria-label="Następny"
      >
        ›
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2
                   [-ms-overflow-style:none] [scrollbar-width:none] no-scrollbar"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {slides.map(slide => (
          <div
            key={slide.id}
            data-slide
            className="snap-start w-full shrink-0 md:w-1/3"
          >
            <div className="group relative h-56 overflow-hidden rounded-xl border bg-card">
              <img
                src={slide.src}
                alt={slide.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="text-sm font-semibold leading-tight">{slide.title}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-white/80">
                  {slide.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots (opcjonalne – statyczne podglądowe) */}
      <div className="mt-2 flex justify-center gap-2">
        {slides.map(s => (
          <span
            key={s.id}
            className="h-2 w-2 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    </div>
  );
}