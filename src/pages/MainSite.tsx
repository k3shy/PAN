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

export default function MainSite() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-pan-black text-pan-white font-inter">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <Marquee />
      <Collections />
      <Products />
      <Lookbook />
      <About />
      <Newsletter />
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AdminBadge />
    </div>
  );
}
