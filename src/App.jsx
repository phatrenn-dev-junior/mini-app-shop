import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import BottomNav from './components/BottomNav.jsx';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--tg-theme-bg-color)', color: 'var(--tg-theme-text-color)' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
