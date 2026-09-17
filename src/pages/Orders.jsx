import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../api.js';
import Header from '../components/Header.jsx';

const statusColors = {
  pending: '#f0ad4e',
  confirmed: '#5bc0de',
  shipped: '#5bc0de',
  delivered: '#4caf50',
  cancelled: '#ff3b30',
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    api
      .getOrders()
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pb-20">
      <Header title="📦 Your Orders" />

      {location.state?.justPlacedOrderId && (
        <div
          className="mx-4 mt-3 p-3 rounded-tg text-sm font-medium"
          style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)', color: 'var(--tg-theme-link-color)' }}
        >
          ✅ Order #{location.state.justPlacedOrderId} placed! We've sent a confirmation to your Telegram chat.
        </div>
      )}

      {error && (
        <p className="px-4 mt-3 text-sm" style={{ color: 'var(--tg-theme-destructive-text-color)' }}>
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-center mt-10 text-sm" style={{ color: 'var(--tg-theme-hint-color)' }}>
          Loading…
        </p>
      ) : orders.length === 0 ? (
        <p className="text-center mt-10 text-sm" style={{ color: 'var(--tg-theme-hint-color)' }}>
          No orders yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3 px-4 mt-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-tg p-3" style={{ backgroundColor: 'var(--tg-theme-section-bg-color)' }}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-sm">Order #{order.id}</span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full capitalize"
                  style={{ backgroundColor: `${statusColors[order.status] || '#999'}22`, color: statusColors[order.status] || '#999' }}
                >
                  {order.status}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 mb-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs" style={{ color: 'var(--tg-theme-hint-color)' }}>
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>${((item.price_cents * item.quantity) / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm font-semibold pt-2 border-t border-black/5">
                <span>{new Date(order.created_at).toLocaleDateString()}</span>
                <span>${(order.total_cents / 100).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
