import { useEffect, useState } from 'react';
import { api } from '../api.js';
import Header from '../components/Header.jsx';
import CategoryChips from '../components/CategoryChips.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getCategories().then(setCategories).catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (search) params.search = search;

    const timeout = setTimeout(() => {
      api
        .getProducts(params)
        .then(setProducts)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }, 250); // debounce search typing

    return () => clearTimeout(timeout);
  }, [activeCategory, search]);

  return (
    <div className="pb-20">
      <Header title="🛍️ Shop" />

      <div className="px-4 pt-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="w-full px-4 py-2.5 rounded-tg text-sm outline-none"
          style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)', color: 'var(--tg-theme-text-color)' }}
        />
      </div>

      <CategoryChips categories={categories} active={activeCategory} onSelect={setActiveCategory} />

      {error && (
        <p className="px-4 text-sm" style={{ color: 'var(--tg-theme-destructive-text-color)' }}>
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-3 px-4 mt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-tg animate-pulse" style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color)' }} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center mt-10 text-sm" style={{ color: 'var(--tg-theme-hint-color)' }}>
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4 mt-2">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
