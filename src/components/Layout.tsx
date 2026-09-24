import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { BackToTop, CookieBanner, MobileBottomNav } from './SharedUI';

interface LayoutProps {
  children: ReactNode;
  onCartClick?: () => void;
}

export default function Layout({ children, onCartClick }: LayoutProps) {
  return (
    <div className="min-h-screen bg-pan-black text-pan-white font-inter pb-16 md:pb-0">
      <Header onCartClick={onCartClick || (() => {})} />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <CookieBanner />
      <MobileBottomNav />
    </div>
  );
}
