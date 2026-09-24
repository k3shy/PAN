import { useState, useEffect } from 'react';
import { ArrowUp, X, Home, ShoppingBag, User, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Back to Top Button
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 md:bottom-6 right-4 z-40 w-12 h-12 bg-pan-accent text-white rounded-full shadow-lg hover:bg-red-600 transition-all flex items-center justify-center"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

// Cookie Consent Banner
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('pan_cookies_accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('pan_cookies_accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-pan-dark border-t border-white/10 p-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-pan-muted">
          🍪 We use cookies to enhance your experience. By continuing, you agree to our{' '}
          <a href="#" className="text-pan-accent hover:underline">cookie policy</a>.
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all"
          >
            Accept
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-4 py-2 border border-white/10 text-pan-muted text-sm rounded-sm hover:border-white/30 transition-all"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

// Loading Splash Screen
export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1500);
    const timer2 = setTimeout(() => onComplete(), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-pan-black flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-pan-accent rounded-sm flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-2xl font-grotesk">P</span>
        </div>
        <h1 className="text-2xl font-grotesk font-bold text-pan-white mb-1">PINS & NEEDLE</h1>
        <p className="text-xs tracking-[0.3em] text-pan-muted">P.A.N STREETWEAR</p>
      </div>
    </div>
  );
}

// Mobile Bottom Navigation
export function MobileBottomNav() {
  const location = useLocation();
  const { totalItems } = useCart();

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/', icon: ShoppingBag, label: 'Shop', hash: '#products' },
    { to: '/wishlist', icon: Heart, label: 'Wishlist' },
    { to: '/login', icon: User, label: 'Account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-pan-dark/95 backdrop-blur-md border-t border-white/5 md:hidden">
      <div className="flex items-center justify-around py-2">
        {links.map((link, i) => {
          const isActive = location.pathname === link.to && !link.hash;
          return (
            <Link
              key={i}
              to={link.to}
              className="flex flex-col items-center gap-1 px-4 py-2 relative"
            >
              <link.icon
                size={20}
                className={isActive ? 'text-pan-accent' : 'text-pan-muted'}
              />
              <span className={`text-[10px] ${isActive ? 'text-pan-accent' : 'text-pan-muted'}`}>
                {link.label}
              </span>
              {link.label === 'Shop' && totalItems > 0 && (
                <span className="absolute top-1 right-2 w-4 h-4 bg-pan-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
