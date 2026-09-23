import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Collections from '../components/Collections';
import Products from '../components/Products';
import Lookbook from '../components/Lookbook';
import About from '../components/About';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import AdminBadge from '../components/AdminBadge';
import { BackToTop, CookieBanner, MobileBottomNav } from '../components/SharedUI';

interface MainSiteProps {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  onSplashComplete: () => void;
}

export default function MainSite({ wishlist, toggleWishlist, onSplashComplete }: MainSiteProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pan-black text-pan-white font-inter pb-16 md:pb-0">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <Marquee />
      <Collections />
      <Products wishlist={wishlist} toggleWishlist={toggleWishlist} />
      <Lookbook />
      <About />
      <Newsletter />
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AdminBadge />
      <BackToTop />
      <CookieBanner />
      <MobileBottomNav />
    </div>
  );
}
