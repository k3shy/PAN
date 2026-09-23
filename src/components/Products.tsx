import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useContent } from '../context/ContentContext';

const categories = ['All', 'Tops', 'Bottoms', 'Accessories'];

function ProductSVG({ icon, accentColor }: { icon: string; accentColor: string }) {
  switch (icon) {
    case 'hoodie':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M35 30 L45 20 L75 20 L85 30 L95 50 L85 55 L80 45 L80 100 L40 100 L40 45 L35 55 L25 50 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <path d="M45 20 Q60 35 75 20" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <line x1="60" y1="35" x2="60" y2="65" stroke={accentColor} strokeWidth="1" strokeDasharray="3,3" />
          <rect x="52" y="70" width="16" height="3" fill={accentColor} opacity="0.5" />
        </svg>
      );
    case 'tee':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M35 30 L45 20 L55 25 Q60 28 65 25 L75 20 L85 30 L95 45 L85 50 L80 40 L80 100 L40 100 L40 40 L35 50 L25 45 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <path d="M55 25 Q60 30 65 25" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <text x="60" y="65" textAnchor="middle" fill={accentColor} fontSize="8" fontFamily="monospace" opacity="0.7">P.A.N</text>
        </svg>
      );
    case 'jacket':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M35 25 L45 18 L55 22 L60 20 L65 22 L75 18 L85 25 L98 50 L88 55 L82 42 L82 105 L60 105 L38 105 L38 42 L32 55 L22 50 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <line x1="60" y1="20" x2="60" y2="105" stroke={accentColor} strokeWidth="1" />
          <circle cx="55" cy="45" r="2" fill={accentColor} opacity="0.5" />
          <circle cx="55" cy="60" r="2" fill={accentColor} opacity="0.5" />
          <circle cx="55" cy="75" r="2" fill={accentColor} opacity="0.5" />
        </svg>
      );
    case 'pants':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M40 15 L80 15 L82 20 L82 50 L75 110 L62 110 L60 60 L58 110 L45 110 L38 50 L38 20 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <line x1="40" y1="25" x2="80" y2="25" stroke={accentColor} strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case 'shorts':
      return (
        <svg viewBox="0 0 120 120" className="w-24 h-24 opacity-60">
          <path d="M38 25 L82 25 L84 30 L84 50 L75 80 L62 80 L60 55 L58 80 L45 80 L36 50 L36 30 Z" fill="none" stroke={accentColor} strokeWidth="1.5" />
          <line x1="38" y1="35" x2="82" y2="35" stroke={accentColor} strokeWidth="1" opacity="0.5" />
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

export default function Products() {
  const { content } = useContent();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();

  const filteredProducts = activeCategory === 'All'
    ? content.products
    : content.products.filter(p => p.category === activeCategory.toLowerCase());

  const handleAddToCart = (product: typeof content.products[0]) => {
    if (product.isSoldOut) return;
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.bgColor
    });
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <section id="products" className="py-20 md:py-32 bg-pan-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm tracking-[0.3em] text-pan-accent mb-3">SHOP</p>
            <h2 className="text-4xl md:text-5xl font-grotesk font-bold tracking-tight">
              Latest Drops
            </h2>
          </div>
          <div className="flex gap-2 mt-6 md:mt-0">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="product-card group relative bg-pan-gray rounded-sm overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: product.bgColor }}>
                <div className="product-image absolute inset-0 transition-transform duration-700 flex items-center justify-center">
                  <ProductSVG icon={product.icon} accentColor={product.accentColor} />
                </div>

                <div className="product-overlay absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.isSoldOut}
                    className={`product-btn px-6 py-3 text-sm font-semibold rounded-sm transition-all duration-300 transform translate-y-4 opacity-0 ${
                      product.isSoldOut
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-pan-accent hover:text-white'
                    }`}
                  >
                    {product.isSoldOut ? 'Sold Out' : 'Add to Cart'}
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
                  KSh {product.price.toLocaleString()}
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
          ))}
        </div>

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
    </section>
  );
}
