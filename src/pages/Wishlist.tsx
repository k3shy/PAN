import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import Layout from '../components/Layout';

interface WishlistPageProps {
  wishlist: number[];
  onRemove: (id: number) => void;
}

export default function WishlistPage({ wishlist, onRemove }: WishlistPageProps) {
  const { content } = useContent();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const wishlistProducts = content.products.filter(p => wishlist.includes(p.id));

  const handleAddToCart = (product: typeof content.products[0]) => {
    if (product.isSoldOut) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.sizes[0],
      image: product.bgColor,
    });
  };

  return (
    <Layout>
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-pan-white">
            Wishlist
          </h1>
          <p className="text-sm text-pan-muted mt-2">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="text-pan-muted/30 mx-auto mb-4" />
            <p className="text-pan-muted mb-2">Your wishlist is empty</p>
            <p className="text-sm text-pan-muted/60 mb-6">
              Save items you love to come back to them later
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-pan-accent text-white font-medium rounded-sm hover:bg-red-600 transition-all"
            >
              <ShoppingBag size={18} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <div
                key={product.id}
                className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden group"
              >
                <div
                  className="aspect-square flex items-center justify-center relative"
                  style={{ backgroundColor: product.bgColor }}
                >
                  <span className="text-4xl font-grotesk font-bold text-white/10">P</span>
                  {product.isNew && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-pan-accent text-white text-[10px] font-bold rounded-sm">
                      NEW
                    </span>
                  )}
                  {product.isSoldOut && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-gray-600 text-white text-[10px] font-bold rounded-sm">
                      SOLD OUT
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-pan-white mb-1">{product.name}</h3>
                  <p className="text-lg font-grotesk font-bold text-pan-white mb-3">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.isSoldOut}
                      className="flex-1 px-4 py-2 bg-pan-accent text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.isSoldOut ? 'Sold Out' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center text-pan-muted hover:text-red-400 hover:border-red-400/30 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
}
