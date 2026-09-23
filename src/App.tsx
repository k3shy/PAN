import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Collections from './components/Collections';
import Products from './components/Products';
import Lookbook from './components/Lookbook';
import About from './components/About';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
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
      </div>
    </CartProvider>
  );
}

export default App;
