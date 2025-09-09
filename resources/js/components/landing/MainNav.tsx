import { Link, router } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { useState } from 'react';

interface MainNavProps {
  authenticated: boolean;
}

// Responsive main navigation with an overlay menu
export function MainNav({ authenticated }: MainNavProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-40 backdrop-blur bg-white/70 dark:bg-neutral-900/70 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand -> na stronę główną */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          <span className="text-[#F53003]">Rent</span>4u
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {/* Home link poprawiony na "/" */}
            <Link href="/" className="hover:text-[#F53003] transition">Home</Link>
            <Link href="/o-nas" className="hover:text-[#F53003] transition">About</Link>
            <Link href="/#cars" className="hover:text-[#F53003] transition">Cars</Link>
            <Link href="/kontakt" className="hover:text-[#F53003] transition">Contact</Link>
                        <Link href="/blog" className="hover:text-[#F53003] transition">Blog</Link>

          {authenticated ? (
            <Link href={dashboard()} className="px-4 py-1.5 rounded bg-[#F53003] text-white hover:bg-[#d72600] transition">Dashboard</Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href={login()} className="text-[#F53003] hover:underline">Login</Link>
              <Link href={register()} className="px-4 py-1.5 rounded bg-[#F53003] text-white hover:bg-[#d72600] transition">Register</Link>
            </div>
          )}
        </nav>

        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden w-9 h-9 inline-flex items-center justify-center rounded hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1 transition" style={{ transform: open ? 'translateY(6px) rotate(45deg)' : '' }} />
            <span className="block w-5 h-0.5 bg-current mb-1 transition" style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-current transition" style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : '' }} />
        </button>

        {open && (
          <div className="fixed inset-0 z-30 md:hidden" aria-hidden>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="absolute top-0 right-0 w-64 h-full bg-white dark:bg-neutral-900 shadow-lg p-6 flex flex-col gap-4">
              <Link href="/" onClick={() => setOpen(false)} className="hover:text-[#F53003]">Home</Link>
              <Link href="/o-nas" onClick={() => setOpen(false)} className="hover:text-[#F53003]">About</Link>
              <Link href="/#cars" onClick={() => setOpen(false)} className="hover:text-[#F53003]">Cars</Link>
              <Link href="/kontakt" onClick={() => setOpen(false)} className="hover:text-[#F53003]">Contact</Link>
                            <Link href="/blog" onClick={() => setOpen(false)} className="hover:text-[#F53003]">Blog</Link>

              {authenticated ? (
                <Link href={dashboard()} onClick={() => setOpen(false)} className="mt-2 px-4 py-2 rounded bg-[#F53003] text-white text-center">Dashboard</Link>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Link href={login()} onClick={() => setOpen(false)} className="text-[#F53003] text-center">Login</Link>
                  <Link href={register()} onClick={() => setOpen(false)} className="px-4 py-2 rounded bg-[#F53003] text-white text-center">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default MainNav;
