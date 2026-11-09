export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold tracking-tighter text-stone-900">
          RJ DENIM
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#catalog" className="hover:text-stone-900 transition-colors">Shop</a>
          <a href="#" className="hover:text-stone-900 transition-colors">About</a>
          <a href="#" className="hover:text-stone-900 transition-colors">Sizing</a>
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium text-stone-600">
          <a href="#" className="hover:text-stone-900 transition-colors hidden sm:block">Account</a>
          <button
            type="button"
            aria-label="Open cart"
            className="hover:text-stone-900 transition-colors"
          >
            Cart (0)
          </button>
        </div>
      </div>
    </header>
  );
}
