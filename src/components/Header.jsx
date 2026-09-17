export default function Header({ title, onBack }) {
  return (
    <header
      className="sticky top-0 z-10 flex items-center gap-3 px-4 h-14 border-b border-black/5 dark:border-white/5"
      style={{ backgroundColor: 'var(--tg-theme-header-bg-color)', color: 'var(--tg-theme-text-color)' }}
    >
      {onBack && (
        <button onClick={onBack} className="text-xl leading-none px-1 -ml-1" aria-label="Back">
          ‹
        </button>
      )}
      <h1 className="text-lg font-semibold truncate">{title}</h1>
    </header>
  );
}
