import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import MainNav from '@/components/landing/MainNav';

interface LandingLayoutProps {
  title?: string;
  children?: ReactNode;
}

export default function LandingLayout({
  title = 'Rent4u',
  children,
}: LandingLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <MainNav authenticated={false} />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rent4u. Wszelkie prawa zastrzeżone.
        </footer>
      </div>
    </>
  );
}