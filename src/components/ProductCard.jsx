import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const price = (product.price_cents / 100).toFixed(2);

  return (
    <Link
      to={`/product/${product.id}`}
      className="rounded-tg overflow-hidden flex flex-col active:scale-[0.98] transition-transform"
      style={{ backgroundColor: 'var(--tg-theme-section-bg-color)' }}
    >
      <div className="aspect-square w-full overflow-hidden bg-black/5">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">🛍️</div>
        )}
      </div>
      <div className="p-2.5 flex flex-col gap-1">
        <p className="text-sm font-medium line-clamp-2 leading-snug">{product.title}</p>
        <p className="text-sm font-semibold" style={{ color: 'var(--tg-theme-link-color)' }}>
          ${price}
        </p>
      </div>
    </Link>
  );
}
