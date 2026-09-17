import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalCents } = useCart();
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      <Header title="🛒 Cart" />

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-2">
          <p className="text-4xl">🛒</p>
          <p style={{ color: 'var(--tg-theme-hint-color)' }}>Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="mt-3 px-4 py-2 rounded-tg text-sm font-medium"
            style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}
          >
            Browse products
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 px-4 mt-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-2.5 rounded-tg"
                style={{ backgroundColor: 'var(--tg-theme-section-bg-color)' }}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-black/5 shrink-0">
                  {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full px-1" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}>
                      <button className="w-6 h-6 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        −
                      </button>
                      <span className="w-4 text-center text-sm">{item.quantity}</span>
                      <button className="w-6 h-6 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--tg-theme-link-color)' }}>
                      ${((item.price_cents * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-lg self-start px-1"
                  style={{ color: 'var(--tg-theme-destructive-text-color)' }}
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="fixed bottom-16 left-0 right-0 px-4 py-3 border-t border-black/5" style={{ backgroundColor: 'var(--tg-theme-bg-color)' }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ color: 'var(--tg-theme-hint-color)' }}>Total</span>
              <span className="text-lg font-bold">${(totalCents / 100).toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3 rounded-tg font-semibold"
              style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
