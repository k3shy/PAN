import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { CartProvider } from './context/CartContext';
import MainSite from './pages/MainSite';
import Login from './pages/Login';
import Portal from './pages/Portal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<MainSite />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/portal"
                element={
                  <ProtectedRoute>
                    <Portal />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </CartProvider>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
