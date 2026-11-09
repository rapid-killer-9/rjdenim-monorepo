import type { WashType, WaistSize, LegLength } from './product';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderLineItem {
  variantId: string;
  sku: string;
  productName: string;
  wash: WashType;
  waist: WaistSize;
  length: LegLength;
  quantity: number;
  unitPriceCents: number;
}

export interface ShippingAddress {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  /** ISO 3166-1 alpha-2, e.g. "US". */
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerEmail: string;
  items: OrderLineItem[];
  shippingAddress: ShippingAddress;
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
