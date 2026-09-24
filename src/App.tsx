import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import MainSite from './pages/MainSite';
import Login from './pages/Login';
import Portal from './pages/Portal';
import Wishlist from './pages/Wishlist';
import OrderTracking from './pages/OrderTracking';
import FAQ from './pages/FAQ';
import SizeGuide from './pages/SizeGuide';
import CustomOrders from './pages/CustomOrders';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(prev => prev.filter(i => i !== id));
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <CartProvider>
            <CurrencyProvider>
              {showSplash && (
                <div className="fixed inset-0 z-[9999] bg-pan-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pan-accent rounded-sm flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <span className="text-white font-bold text-2xl font-grotesk">P</span>
                    </div>
                    <h1 className="text-2xl font-grotesk font-bold text-pan-white mb-1">PINS & NEEDLE</h1>
                    <p className="text-xs tracking-[0.3em] text-pan-muted">P.A.N STREETWEAR</p>
                  </div>
                </div>
              )}
              <Routes>
                <Route path="/" element={<MainSite wishlist={wishlist} toggleWishlist={toggleWishlist} onSplashComplete={handleSplashComplete} />} />
                <Route path="/wishlist" element={<Wishlist wishlist={wishlist} onRemove={removeFromWishlist} />} />
                <Route path="/order-tracking" element={<OrderTracking />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/custom-orders" element={<CustomOrders />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/portal"
                  element={
                    <ProtectedRoute>
                      <Portal />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CurrencyProvider>
          </CartProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
