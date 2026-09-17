import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import { api } from '../api.js';
import Header from '../components/Header.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Checkout() {
  const { items, totalCents, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items]);

  // Prefill name from Telegram profile if available
  useEffect(() => {
    const tgUser = WebApp.initDataUnsafe?.user;
    if (tgUser) {
      setForm((f) => ({ ...f, customerName: f.customerName || `${tgUser.first_name || ''} ${tgUser.last_name || ''}`.trim() }));
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.customerName || !form.phone || !form.address) {
      setError('Please fill in your name, phone and address.');
      return;
    }

    setSubmitting(true);
    try {
      const order = await api.createOrder({
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
        ...form,
      });
      clearCart();
      WebApp.HapticFeedback?.notificationOccurred('success');
      navigate('/orders', { state: { justPlacedOrderId: order.id } });
    } catch (err) {
      setError(err.message);
      WebApp.HapticFeedback?.notificationOccurred('error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pb-24">
      <Header title="Checkout" onBack={() => navigate(-1)} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
        <div
          className="rounded-tg p-3 flex flex-col gap-1"
          style={{ backgroundColor: 'var(--tg-theme-section-bg-color)' }}
        >
          {items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm">
              <span className="truncate pr-2">
                {i.title} × {i.quantity}
              </span>
              <span className="shrink-0">${((i.price_cents * i.quantity) / 100).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold pt-2 mt-1 border-t border-black/5">
            <span>Total</span>
            <span>${(totalCents / 100).toFixed(2)}</span>
          </div>
        </div>

        {[
          { name: 'customerName', label: 'Full name', placeholder: 'John Doe' },
          { name: 'phone', label: 'Phone number', placeholder: '+1 555 123 4567' },
          { name: 'address', label: 'Delivery address', placeholder: '123 Main St, City' },
        ].map((field) => (
          <label key={field.name} className="flex flex-col gap-1 text-sm">
            <span style={{ color: 'var(--tg-theme-hint-color)' }}>{field.label}</span>
            <input
              value={form[field.name]}
              onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              placeholder={field.placeholder}
              className="px-3.5 py-2.5 rounded-tg outline-none"
              style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)', color: 'var(--tg-theme-text-color)' }}
            />
          </label>
        ))}

        <label className="flex flex-col gap-1 text-sm">
          <span style={{ color: 'var(--tg-theme-hint-color)' }}>Order notes (optional)</span>
          <textarea
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            rows={3}
            className="px-3.5 py-2.5 rounded-tg outline-none resize-none"
            style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)', color: 'var(--tg-theme-text-color)' }}
          />
        </label>

        {error && (
          <p className="text-sm" style={{ color: 'var(--tg-theme-destructive-text-color)' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full py-3 rounded-tg font-semibold disabled:opacity-60"
          style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}
        >
          {submitting ? 'Placing order…' : `Place order — $${(totalCents / 100).toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}
