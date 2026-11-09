import type { WashType } from '@rjdenim/shared-types';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    basePriceCents: number;
    imageUrl: string;
    wash: WashType;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const price = (product.basePriceCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const washLabel = product.wash.replace('-', ' ');

  return (
    <article className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl bg-stone-100 aspect-[4/5] mb-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
          {washLabel}
        </span>
      </div>

      <div className="space-y-1 px-1">
        <h3 className="font-semibold text-stone-900 leading-snug text-sm">{product.name}</h3>
        <p className="text-stone-500 text-sm">{price}</p>
      </div>
    </article>
  );
}
