import { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { currency, setCurrency } = useCurrency();

  const navLinks = [
    { label: 'New Arrivals', hash: '#products' },
    { label: 'Tops', hash: '#products' },
    { label: 'Bottoms', hash: '#products' },
    { label: 'Accessories', hash: '#products' },
    { label: 'Collections', hash: '#collections' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pan-black/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-pan-white hover:text-pan-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
                key={link.label}
                href={link.hash}
                className="text-sm font-medium text-pan-muted hover:text-pan-white transition-colors duration-300 relative group"
                onClick={(e) => handleNavClick(e, link.hash)}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pan-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Currency Toggle */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'KSh' | 'USD' | 'EUR')}
              className="hidden md:block px-2 py-1 bg-pan-gray border border-white/10 rounded-sm text-xs text-pan-white focus:outline-none focus:border-pan-accent"
            >
              <option value="KSh">KSh</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-pan-muted hover:text-pan-white transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden md:block text-pan-muted hover:text-pan-white transition-colors"
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </Link>

            <button className="hidden md:block text-pan-muted hover:text-pan-white transition-colors" aria-label="Account">
              <User size={20} />
            </button>
            <button
              onClick={onCartClick}
              className="relative text-pan-muted hover:text-pan-white transition-colors"
              aria-label="Shopping cart"
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

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-white/5 bg-pan-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form onSubmit={handleSearch} className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pan-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-pan-gray border border-white/10 rounded-sm text-white placeholder-pan-muted focus:outline-none focus:border-pan-accent transition-colors"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-pan-dark border-t border-white/5 absolute top-full left-0 right-0">
          <nav className="px-4 py-6 space-y-4">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.hash}
                className="block text-lg font-medium text-pan-muted hover:text-pan-white transition-colors py-2"
                onClick={(e) => handleNavClick(e, link.hash)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as 'KSh' | 'USD' | 'EUR')}
                  className="px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-sm text-pan-white focus:outline-none focus:border-pan-accent"
                >
                  <option value="KSh">KSh</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div className="flex gap-6">
                <button className="text-pan-muted hover:text-pan-white transition-colors" aria-label="Search">
                  <Search size={20} />
                </button>
                <Link to="/wishlist" className="text-pan-muted hover:text-pan-white transition-colors" aria-label="Wishlist">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </Link>
                <button className="text-pan-muted hover:text-pan-white transition-colors" aria-label="Account">
                  <User size={20} />
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
