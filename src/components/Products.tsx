import { useState, useEffect } from 'react';
import { Heart, ShoppingBag, Search, X, Clock, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';
import { useCurrency } from '../context/CurrencyContext';

const categories = ['All', 'Tops', 'Bottoms', 'Accessories'];

function ProductSVG({ icon, accentColor }: { icon: string; accentColor: string }) {
  switch (icon) {
    case 'hoodie':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M35 30 L45 20 L75 20 L85 30 L95 50 L85 55 L80 45 L80 100 L40 100 L40 45 L35 55 L25 50 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <path d="M45 20 Q60 35 75 20" fill="none" stroke={accentColor} strokeWidth="1.5" />
        </svg>
      );
    case 'tee':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M35 30 L45 20 L55 25 Q60 28 65 25 L75 20 L85 30 L95 45 L85 50 L80 40 L80 100 L40 100 L40 40 L35 50 L25 45 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <text x="60" y="65" textAnchor="middle" fill={accentColor} fontSize="8" fontFamily="monospace" opacity="0.7">P.A.N</text>
        </svg>
      );
    case 'jacket':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M35 25 L45 18 L55 22 L60 20 L65 22 L75 18 L85 25 L98 50 L88 55 L82 42 L82 105 L60 105 L38 105 L38 42 L32 55 L22 50 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <line x1="60" y1="20" x2="60" y2="105" stroke={accentColor} strokeWidth="1" />
        </svg>
      );
    case 'pants':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M40 15 L80 15 L82 20 L82 50 L75 110 L62 110 L60 60 L58 110 L45 110 L38 50 L38 20 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
        </svg>
      );
    case 'shorts':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M38 25 L82 25 L84 30 L84 50 L75 80 L62 80 L60 55 L58 80 L45 80 L36 50 L36 30 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
        </svg>
      );
    case 'cap':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M30 65 Q30 35 60 30 Q90 35 90 65 L90 70 L30 70 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <path d="M25 70 L95 70 Q100 70 100 75 L100 78 Q100 82 95 82 L25 82 Q20 82 20 78 L20 75 Q20 70 25 70" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <text x="60" y="55" textAnchor="middle" fill={accentColor} fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.7">P</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <rect x="30" y="30" width="60" height="60" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <text x="60" y="65" textAnchor="middle" fill={accentColor} fontSize="12" fontFamily="monospace" opacity="0.7">P.A.N</text>
        </svg>
      );
  }
}

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(23, 59, 59);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-pan-accent/10 to-pan-dark border border-pan-accent/20 rounded-sm p-4 mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Clock size={20} className="text-pan-accent" />
          <div>
            <p className="text-sm font-semibold text-pan-white">Limited Drop Ending Soon</p>
            <p className="text-xs text-pan-muted">Stitch Culture collection — only 100 pieces</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hrs' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Sec' },
          ].map((item, i) => (
            <div key={i} className="bg-pan-dark border border-white/10 rounded-sm px-3 py-2 text-center min-w-[50px]">
              <p className="text-lg font-grotesk font-bold text-pan-accent">{String(item.value).padStart(2, '0')}</p>
              <p className="text-[9px] text-pan-muted uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Quick View Modal
function QuickViewModal({ product, onClose, wishlist, toggleWishlist }: any) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { content } = useContent();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const relatedProducts = content.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const stockCount = product.isSoldOut ? 0 : Math.floor(Math.random() * 10) + 1;

  const handleAddToCart = () => {
    if (product.isSoldOut) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.bgColor,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-pan-dark border border-white/10 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-pan-gray rounded-full flex items-center justify-center hover:bg-pan-accent transition-colors"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div
            className="aspect-square flex items-center justify-center relative"
            style={{ backgroundColor: product.bgColor }}
          >
            <ProductSVG icon={product.icon} accentColor={product.accentColor} />
            {product.isNew && (
              <span className="absolute top-4 left-4 px-2 py-1 bg-pan-accent text-white text-[10px] font-bold rounded-sm">NEW</span>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-grotesk font-bold text-pan-white mb-2">{product.name}</h2>
            <p className="text-2xl font-grotesk font-bold text-pan-accent mb-4">{formatPrice(product.price)}</p>

            {/* Stock Indicator */}
            {!product.isSoldOut && stockCount <= 5 && (
              <div className="flex items-center gap-2 mb-4 p-2 bg-yellow-900/10 border border-yellow-900/20 rounded-sm">
                <AlertTriangle size={14} className="text-yellow-400" />
                <p className="text-xs text-yellow-400">Only {stockCount} left in stock!</p>
              </div>
            )}

            <p className="text-sm text-pan-muted mb-6 leading-relaxed">
              Premium quality streetwear crafted with attention to every detail. Made from heavyweight cotton for a comfortable, relaxed fit.
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-pan-white mb-2">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-xs font-medium rounded-sm border transition-all ${
                      selectedSize === size
                        ? 'border-pan-accent text-pan-accent bg-pan-accent/10'
                        : 'border-white/10 text-pan-muted hover:border-white/30'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="/size-guide" className="text-xs text-pan-accent hover:underline mt-2 inline-block">
                View Size Guide →
              </a>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.isSoldOut}
                className="flex-1 py-3 bg-pan-accent text-white font-semibold rounded-sm hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.isSoldOut ? 'Sold Out' : 'Add to Cart'}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-12 h-12 border border-white/10 rounded-sm flex items-center justify-center hover:border-pan-accent transition-all"
              >
                <Heart
                  size={18}
                  className={wishlist.includes(product.id) ? 'fill-pan-accent text-pan-accent' : 'text-pan-muted'}
                />
              </button>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <p className="text-sm font-medium text-pan-white mb-3">You Might Also Like</p>
                <div className="grid grid-cols-2 gap-2">
                  {relatedProducts.map((related: any) => (
                    <div key={related.id} className="bg-pan-gray rounded-sm p-2 flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: related.bgColor }}
                      >
                        <span className="text-white/30 text-xs font-bold">P</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-pan-white truncate">{related.name}</p>
                        <p className="text-xs text-pan-accent">{formatPrice(related.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductsProps {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

export default function Products({ wishlist, toggleWishlist }: ProductsProps) {
  const { content } = useContent();
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const { addToCart } = useCart();

  let filteredProducts = activeCategory === 'All'
    ? content.products
    : content.products.filter(p => p.category === activeCategory.toLowerCase());

  // Search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sort
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  const handleAddToCart = (product: typeof content.products[0]) => {
    if (product.isSoldOut) return;
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.bgColor,
    });
  };

  // Random stock counts (simulated)
  const stockCounts: Record<number, number> = {
    1: 8, 2: 3, 3: 15, 4: 2, 5: 12, 6: 20, 7: 0, 8: 6,
  };

  return (
    <section id="products" className="py-20 md:py-32 bg-pan-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Countdown Timer */}
        <CountdownTimer />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="text-sm tracking-[0.3em] text-pan-accent mb-3">SHOP</p>
            <h2 className="text-4xl md:text-5xl font-grotesk font-bold tracking-tight">
              Latest Drops
            </h2>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-pan-accent text-white'
                    : 'bg-pan-light text-pan-muted hover:text-pan-white hover:bg-pan-gray'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-pan-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-pan-gray border border-white/10 rounded-sm text-white text-sm placeholder-pan-muted focus:outline-none focus:border-pan-accent transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-pan-gray border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-pan-accent transition-colors"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const stock = stockCounts[product.id] || 5;
            return (
              <div
                key={product.id}
                className="product-card group relative bg-pan-gray rounded-sm overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: product.bgColor }}>
                  <div className="product-image absolute inset-0 transition-transform duration-700 flex items-center justify-center">
                    <ProductSVG icon={product.icon} accentColor={product.accentColor} />
                  </div>

                  <div className="product-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.isSoldOut}
                      className={`product-btn px-4 py-2 text-xs font-semibold rounded-sm transition-all duration-300 transform translate-y-4 opacity-0 ${
                        product.isSoldOut
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-pan-accent hover:text-white'
                      }`}
                    >
                      {product.isSoldOut ? 'Sold Out' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="product-btn px-4 py-2 text-xs font-semibold rounded-sm transition-all duration-300 transform translate-y-4 opacity-0 border border-white/30 text-white hover:bg-white hover:text-black"
                    >
                      Quick View
                    </button>
                  </div>

                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="px-2 py-1 bg-pan-accent text-white text-[10px] font-bold tracking-wider rounded-sm">NEW</span>
                    )}
                    {product.isSoldOut && (
                      <span className="px-2 py-1 bg-gray-600 text-white text-[10px] font-bold tracking-wider rounded-sm">SOLD OUT</span>
                    )}
                  </div>

                  {/* Stock Indicator */}
                  {!product.isSoldOut && stock <= 5 && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-black/70 backdrop-blur-sm rounded-sm px-2 py-1 flex items-center gap-1.5">
                        <AlertTriangle size={10} className="text-yellow-400" />
                        <span className="text-[10px] text-yellow-400 font-medium">Only {stock} left!</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-pan-accent transition-colors"
                  >
                    <Heart
                      size={14}
                      className={wishlist.includes(product.id) ? 'fill-pan-accent text-pan-accent' : 'text-white'}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium text-pan-white mb-1 group-hover:text-pan-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-grotesk font-bold text-pan-white mb-3">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-1.5">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: size }))}
                        className={`w-8 h-8 text-[10px] font-medium rounded-sm border transition-all ${
                          (selectedSizes[product.id] || product.sizes[0]) === size
                            ? 'border-pan-accent text-pan-accent bg-pan-accent/10'
                            : 'border-white/10 text-pan-muted hover:border-white/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-pan-muted">No products found matching your search.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-sm hover:bg-white/5 hover:border-white/40 transition-all duration-300"
          >
            <ShoppingBag size={18} />
            View All Products
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      )}
    </section>
  );
}
