import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import type { WashType } from '@rjdenim/shared-types';

interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  basePriceCents: number;
  imageUrl: string;
  wash: WashType;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: '1',
    name: 'The Straight — Raw Selvedge',
    slug: 'straight-raw-selvedge',
    basePriceCents: 18900,
    imageUrl: 'https://placehold.co/400x500/1a1a3e/ffffff?text=Raw+Selvedge',
    wash: 'raw',
  },
  {
    id: '2',
    name: 'The Slim — Mid Wash',
    slug: 'slim-mid-wash',
    basePriceCents: 16900,
    imageUrl: 'https://placehold.co/400x500/6b7280/ffffff?text=Mid+Wash',
    wash: 'mid-wash',
  },
  {
    id: '3',
    name: 'The Relaxed — Dark Wash',
    slug: 'relaxed-dark-wash',
    basePriceCents: 17500,
    imageUrl: 'https://placehold.co/400x500/1e293b/ffffff?text=Dark+Wash',
    wash: 'dark-wash',
  },
  {
    id: '4',
    name: 'The Tapered — Black',
    slug: 'tapered-black',
    basePriceCents: 17900,
    imageUrl: 'https://placehold.co/400x500/0f172a/ffffff?text=Black',
    wash: 'black',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-stone-900 text-white py-28 px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4">
            New Season — AW25
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Built to Last.
          </h1>
          <p className="text-lg text-stone-300 max-w-md mx-auto mb-10 leading-relaxed">
            Premium denim in every wash and waist, cut for a clean, confident fit.
          </p>
          <a
            href="#catalog"
            className="inline-block bg-white text-stone-900 font-semibold px-8 py-3.5 rounded-full hover:bg-stone-100 transition-colors"
          >
            Shop Now
          </a>
        </section>

        {/* Washes strip */}
        <section className="border-y border-stone-200 bg-white py-4 overflow-x-auto">
          <ul className="flex items-center justify-center gap-6 px-6 text-xs font-medium tracking-widest uppercase text-stone-500 whitespace-nowrap">
            {['Raw', 'Light Wash', 'Mid Wash', 'Dark Wash', 'Black', 'Acid Wash', 'Distressed'].map(
              (w) => (
                <li key={w} className="hover:text-stone-900 cursor-pointer transition-colors">
                  {w}
                </li>
              )
            )}
          </ul>
        </section>

        {/* Catalog */}
        <section id="catalog" className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-10 tracking-tight">Catalog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Size guide CTA */}
        <section className="bg-stone-100 py-16 px-6 text-center">
          <h3 className="text-xl font-bold mb-2">Find Your Fit</h3>
          <p className="text-stone-500 text-sm mb-6 max-w-sm mx-auto">
            Waists 30–48. All inseams. Use our size guide to get the perfect pair.
          </p>
          <a
            href="#"
            className="inline-block border border-stone-900 text-stone-900 font-semibold px-7 py-3 rounded-full hover:bg-stone-900 hover:text-white transition-colors text-sm"
          >
            View Size Guide
          </a>
        </section>
      </main>

      <footer className="border-t border-stone-200 py-8 px-6 text-center text-xs text-stone-400 tracking-wide">
        © {new Date().getFullYear()} RJ Denim. All rights reserved.
      </footer>
    </div>
  );
}
