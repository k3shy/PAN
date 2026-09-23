import { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = ['New Arrivals', 'Tops', 'Bottoms', 'Accessories', 'Collections'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pan-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-pan-white hover:text-pan-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pan-accent rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs font-grotesk">P</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-grotesk font-bold tracking-tight">PINS & NEEDLE</h1>
                <p className="text-[10px] tracking-[0.3em] text-pan-muted -mt-1">P.A.N STREETWEAR</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-grotesk font-bold tracking-tight">P.A.N</h1>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-pan-muted hover:text-pan-white transition-colors duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pan-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-pan-muted hover:text-pan-white transition-colors">
              <Search size={20} />
            </button>
            <button className="hidden md:block text-pan-muted hover:text-pan-white transition-colors">
              <User size={20} />
            </button>
            <button
              onClick={onCartClick}
              className="relative text-pan-muted hover:text-pan-white transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-pan-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-pan-dark border-t border-white/5 animate-fade-in-up">
          <nav className="px-4 py-6 space-y-4">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="block text-lg font-medium text-pan-muted hover:text-pan-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex gap-6">
              <button className="text-pan-muted hover:text-pan-white transition-colors">
                <Search size={20} />
              </button>
              <button className="text-pan-muted hover:text-pan-white transition-colors">
                <User size={20} />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
