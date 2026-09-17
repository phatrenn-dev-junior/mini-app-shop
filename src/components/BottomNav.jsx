import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const tabs = [
  { to: '/', label: 'Shop', icon: '🏬' },
  { to: '/cart', label: 'Cart', icon: '🛒' },
  { to: '/orders', label: 'Orders', icon: '📦' },
];

export default function BottomNav() {
  const { totalCount } = useCart();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 border-t border-black/5 dark:border-white/5"
      style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }}
    >
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-0.5 text-xs w-16 transition-opacity ${
                isActive ? 'opacity-100' : 'opacity-50'
              }`
            }
            style={{ color: 'var(--tg-theme-text-color)' }}
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.to === '/cart' && totalCount > 0 && (
              <span
                className="absolute -top-1 right-2 text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--tg-theme-button-color)',
                  color: 'var(--tg-theme-button-text-color)',
                }}
              >
                {totalCount}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
