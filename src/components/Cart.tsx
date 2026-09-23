import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROMO_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; label: string }> = {
  'PAN10': { discount: 10, type: 'percent', label: '10% off' },
  'PAN20': { discount: 20, type: 'percent', label: '20% off' },
  'STREET500': { discount: 500, type: 'fixed', label: 'KSh 500 off' },
  'WELCOME': { discount: 15, type: 'percent', label: '15% off first order' },
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  const applyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  // Calculate discount
  let discount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.type === 'percent') {
      discount = totalPrice * (promo.discount / 100);
    } else {
      discount = promo.discount;
    }
  }
  const finalTotal = Math.max(0, totalPrice - discount);

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
            {/* Promo Code */}
            <div>
              <label className="text-xs text-pan-muted mb-1 block">Promo Code</label>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2 bg-green-900/20 border border-green-900/30 rounded-sm">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-green-400" />
                    <span className="text-xs text-green-400 font-medium">{appliedPromo} — {PROMO_CODES[appliedPromo].label}</span>
                  </div>
                  <button onClick={removePromo} className="text-xs text-pan-muted hover:text-red-400">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 bg-pan-gray border border-white/10 rounded-sm text-white text-xs placeholder-pan-muted focus:outline-none focus:border-pan-accent"
                  />
                  <button
                    onClick={applyPromo}
                    className="px-3 py-2 bg-pan-light text-pan-white text-xs font-medium rounded-sm hover:bg-pan-accent transition-all"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && <p className="text-[10px] text-red-400 mt-1">{promoError}</p>}
              <p className="text-[10px] text-pan-muted/60 mt-1">Try: PAN10, PAN20, WELCOME</p>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-pan-muted">Subtotal</span>
              <span className="text-sm text-pan-white">{formatPrice(totalPrice)}</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400">Discount</span>
                <span className="text-sm text-green-400">-{formatPrice(discount)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-sm font-medium text-pan-white">Total</span>
              <span className="text-lg font-grotesk font-bold text-pan-white">{formatPrice(finalTotal)}</span>
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
