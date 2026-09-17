import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import { api } from '../api.js';
import Header from '../components/Header.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getProduct(id).then(setProduct).catch((e) => setError(e.message));
  }, [id]);

  useEffect(() => {
    // Telegram's native MainButton, driven from React state.
    if (!product) return;

    WebApp.MainButton.setText(`Add to cart — $${((product.price_cents * quantity) / 100).toFixed(2)}`);
    WebApp.MainButton.show();

    const handler = () => {
      addItem(product, quantity);
      WebApp.HapticFeedback?.notificationOccurred('success');
      navigate('/cart');
    };
    WebApp.MainButton.onClick(handler);

    return () => {
      WebApp.MainButton.offClick(handler);
      WebApp.MainButton.hide();
    };
  }, [product, quantity]);

  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!product) {
    return (
      <div className="p-4">
        <div className="aspect-square w-full rounded-tg animate-pulse" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }} />
      </div>
    );
  }

  return (
    <div className="pb-24">
      <Header title={product.category_name || 'Product'} onBack={() => navigate(-1)} />

      <div className="aspect-square w-full bg-black/5">
        {product.image_url && <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />}
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <p className="text-2xl font-bold" style={{ color: 'var(--tg-theme-link-color)' }}>
          ${(product.price_cents / 100).toFixed(2)}
        </p>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm" style={{ color: 'var(--tg-theme-hint-color)' }}>
            Quantity
          </span>
          <div className="flex items-center gap-3 rounded-full px-1" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}>
            <button
              className="w-8 h-8 rounded-full text-lg"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span className="w-5 text-center">{quantity}</span>
            <button
              className="w-8 h-8 rounded-full text-lg"
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            >
              +
            </button>
          </div>
        </div>

        <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--tg-theme-text-color)' }}>
          {product.description}
        </p>

        <p className="text-xs" style={{ color: 'var(--tg-theme-hint-color)' }}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>

        {/* Fallback button for non-Telegram / desktop preview where MainButton isn't visible */}
        <button
          onClick={() => {
            addItem(product, quantity);
            navigate('/cart');
          }}
          disabled={product.stock === 0}
          className="mt-2 w-full py-3 rounded-tg font-semibold disabled:opacity-50"
          style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
