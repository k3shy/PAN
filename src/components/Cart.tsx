import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-overlay-in"
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div className="absolute top-0 right-0 h-full w-full max-w-md bg-pan-dark animate-slide-in flex flex-col border-l border-white/5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-pan-accent" />
            <h2 className="text-lg font-grotesk font-bold">Your Cart</h2>
            <span className="text-xs bg-pan-accent text-white px-2 py-0.5 rounded-full">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-pan-light rounded-sm transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-pan-muted/30 mb-4" />
              <p className="text-pan-muted mb-2">Your cart is empty</p>
              <p className="text-sm text-pan-muted/60 mb-6">Add some items to get started</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-pan-accent text-white text-sm font-semibold rounded-sm hover:bg-red-600 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-4 bg-pan-gray rounded-sm border border-white/5"
                >
                  {/* Product Image */}
                  <div
                    className="w-20 h-20 rounded-sm flex items-center justify-center flex-shrink-0 border border-white/10"
                    style={{ backgroundColor: item.image || '#1a1a1a' }}
                  >
                    <span className="text-white/40 font-grotesk font-bold text-lg">P</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-pan-white truncate">{item.name}</h3>
                    <p className="text-xs text-pan-muted mt-0.5">Size: {item.size}</p>
                    <p className="text-sm font-grotesk font-bold text-pan-accent mt-1">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center border border-white/10 rounded-sm hover:border-pan-accent hover:text-pan-accent transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center border border-white/10 rounded-sm hover:border-pan-accent hover:text-pan-accent transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-pan-muted hover:text-pan-accent transition-colors"
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

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-pan-muted">Subtotal</span>
              <span className="text-lg font-grotesk font-bold">KSh {totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-pan-muted">Shipping calculated at checkout</p>

            {/* Checkout Button */}
            <button className="w-full py-4 bg-pan-accent text-white font-semibold rounded-sm hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-pan-accent/20">
              Proceed to Checkout
            </button>

            {/* Payment Methods */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-pan-gray rounded-sm">
                <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-[6px] font-bold">M</span>
                </div>
                <span className="text-[10px] text-pan-muted">M-Pesa</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-pan-gray rounded-sm">
                <div className="w-4 h-4 bg-blue-700 rounded-sm flex items-center justify-center">
                  <span className="text-white text-[6px] font-bold italic">V</span>
                </div>
                <span className="text-[10px] text-pan-muted">Visa</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-pan-gray rounded-sm">
                <div className="flex -space-x-0.5">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
                </div>
                <span className="text-[10px] text-pan-muted">MC</span>
              </div>
            </div>

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="w-full py-2 text-xs text-pan-muted hover:text-pan-accent transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
