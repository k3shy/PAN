import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  isNew?: boolean;
  isSoldOut?: boolean;
  color: string;
}

const products: Product[] = [
  { id: 1, name: "P.A.N Oversized Hoodie", price: 5000, category: "tops", sizes: ["S", "M", "L", "XL"], isNew: true, color: "bg-gradient-to-br from-gray-800 to-gray-900" },
  { id: 2, name: "Needle Cargo Pants", price: 4200, category: "bottoms", sizes: ["S", "M", "L", "XL"], isNew: true, color: "bg-gradient-to-br from-stone-800 to-stone-900" },
  { id: 3, name: "Thread Theory Tee", price: 3000, category: "tops", sizes: ["S", "M", "L", "XL"], color: "bg-gradient-to-br from-zinc-700 to-zinc-900" },
  { id: 4, name: "Stitch Bomber Jacket", price: 8500, category: "tops", sizes: ["M", "L", "XL"], isNew: true, color: "bg-gradient-to-br from-slate-700 to-slate-900" },
  { id: 5, name: "P.A.N Track Pants", price: 3800, category: "bottoms", sizes: ["S", "M", "L"], color: "bg-gradient-to-br from-neutral-800 to-neutral-900" },
  { id: 6, name: "Embroidered Cap", price: 2500, category: "accessories", sizes: ["One Size"], color: "bg-gradient-to-br from-gray-700 to-gray-900" },
  { id: 7, name: "Deconstructed Crewneck", price: 4500, category: "tops", sizes: ["S", "M", "L", "XL"], isSoldOut: true, color: "bg-gradient-to-br from-stone-700 to-stone-900" },
  { id: 8, name: "P.A.N Utility Shorts", price: 3200, category: "bottoms", sizes: ["S", "M", "L"], color: "bg-gradient-to-br from-zinc-800 to-zinc-900" },
];

const categories = ['All', 'Tops', 'Bottoms', 'Accessories'];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory.toLowerCase());

  const handleAddToCart = (product: Product) => {
    if (product.isSoldOut) return;
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.color
    });
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <section id="products" className="py-20 md:py-32 bg-pan-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm tracking-[0.3em] text-pan-accent mb-3">SHOP</p>
            <h2 className="text-4xl md:text-5xl font-grotesk font-bold tracking-tight">
              Latest Drops
            </h2>
          </div>

          {/* Category Filter */}
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="product-card group relative bg-pan-gray rounded-sm overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
            >
              {/* Product Image */}
              <div className={`relative aspect-square ${product.color} overflow-hidden`}>
                <div className="product-image absolute inset-0 transition-transform duration-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 border border-white/20 rounded-sm flex items-center justify-center">
                      <span className="text-lg font-grotesk font-bold text-white/60">P</span>
                    </div>
                    <p className="text-xs text-white/40 tracking-wider">{product.name.split(' ')[0]}</p>
                  </div>
                </div>

                {/* Overlay */}
                <div className="product-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.isSoldOut}
                    className={`px-6 py-3 text-sm font-semibold rounded-sm transition-all ${
                      product.isSoldOut
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-pan-accent hover:text-white'
                    }`}
                  >
                    {product.isSoldOut ? 'Sold Out' : 'Add to Cart'}
                  </button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-2 py-1 bg-pan-accent text-white text-[10px] font-bold tracking-wider rounded-sm">NEW</span>
                  )}
                  {product.isSoldOut && (
                    <span className="px-2 py-1 bg-gray-600 text-white text-[10px] font-bold tracking-wider rounded-sm">SOLD OUT</span>
                  )}
                </div>

                {/* Wishlist */}
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

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-pan-white mb-1 group-hover:text-pan-accent transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-grotesk font-bold text-pan-white mb-3">
                  KSh {product.price.toLocaleString()}
                </p>

                {/* Size selector */}
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

        {/* View All */}
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
