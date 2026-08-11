import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter }: LayoutProps) {
  return (
    <div data-ev-id="ev_4a3a9d277c" className="min-h-screen flex flex-col bg-background">
      <Header />
      <main data-ev-id="ev_bc3d172ee5" className="flex-1">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>);

}