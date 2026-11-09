export type WaistSize =
  | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 38 | 40 | 42 | 44 | 46 | 48;

export type LegLength = 28 | 30 | 32 | 34 | 36;

export type WashType =
  | 'raw'
  | 'light-wash'
  | 'mid-wash'
  | 'dark-wash'
  | 'black'
  | 'acid-wash'
  | 'distressed';

export interface ProductVariant {
  id: string;
  waist: WaistSize;
  length: LegLength;
  wash: WashType;
  sku: string;
  stock: number;
  /** Delta from base price in cents — negative values are discounts. */
  priceModifier: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Base price in cents before variant modifier. */
  basePriceCents: number;
  imageUrls: string[];
  variants: ProductVariant[];
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
