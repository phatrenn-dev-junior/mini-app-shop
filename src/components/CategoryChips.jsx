export default function CategoryChips({ categories, active, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3">
      <button
        onClick={() => onSelect(null)}
        className="shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors"
        style={
          !active
            ? { backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }
            : { backgroundColor: 'var(--tg-theme-secondary-bg-color)', color: 'var(--tg-theme-text-color)' }
        }
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          onClick={() => onSelect(c.slug)}
          className="shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors"
          style={
            active === c.slug
              ? { backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }
              : { backgroundColor: 'var(--tg-theme-secondary-bg-color)', color: 'var(--tg-theme-text-color)' }
          }
        >
          {c.icon} {c.name}
        </button>
      ))}
    </div>
  );
}
