import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
    <Header />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
);

