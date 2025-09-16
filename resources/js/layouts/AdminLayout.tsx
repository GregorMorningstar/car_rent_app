import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

type Shared = {
  auth?: { user?: { name?: string } };
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const page = usePage() as unknown as { props: Shared; url: string };
  const { props } = page;
  const currentUrl = page.url ?? '';
  const userName = props.auth?.user?.name ?? 'Gość';

  const [openPosts, setOpenPosts] = useState(currentUrl.startsWith('/admin/posts'));
  const [openCars, setOpenCars] = useState(currentUrl.startsWith('/admin/cars'));

  const handleLogout = () => {
    router.post('/logout');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 font-semibold text-lg">Panel admina</div>
        <nav className="px-2 space-y-1">
          <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/">Strona główna</Link>
          <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin">Dashboard</Link>

          {/* Posty */}
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100"
            onClick={() => setOpenPosts(v => !v)}
            aria-expanded={openPosts}
            aria-controls="submenu-posts"
          >
            <span>Posty</span>
            <span className="text-xs">{openPosts ? '▾' : '▸'}</span>
          </button>
          {openPosts && (
            <div id="submenu-posts" className="ml-3 mb-1 space-y-1">
              <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/blog">Wszystkie posty</Link>
              <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/blog/create">Dodaj post</Link>
              <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/post-categories">Kategorie</Link>
            </div>
          )}

          {/* Samochody */}
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100"
            onClick={() => setOpenCars(v => !v)}
            aria-expanded={openCars}
            aria-controls="submenu-cars"
          >
            <span>Samochody</span>
            <span className="text-xs">{openCars ? '▾' : '▸'}</span>
          </button>
          {openCars && (
            <div id="submenu-cars" className="ml-3 mb-1 space-y-1">
              <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/cars">Wszystkie samochody</Link>
              <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/cars/create">Dodaj samochód</Link>
            </div>
          )}

          <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/rentals">Wynajmy</Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 bg-white border-b flex items-center justify-between px-4">
          <div className="font-medium">Admin</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{userName}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Wyloguj
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
