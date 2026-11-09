import { z } from 'zod';
import { WaistSizeSchema, WashTypeSchema, LegLengthSchema } from './product.schema';

export const OrderStatusSchema = z.enum([
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
]);

export const OrderLineItemSchema = z.object({
  variantId: z.string().uuid(),
  sku: z.string().min(1),
  productName: z.string().min(1),
  wash: WashTypeSchema,
  waist: WaistSizeSchema,
  length: LegLengthSchema,
  quantity: z.number().int().positive(),
  unitPriceCents: z.number().int().positive(),
});

export const ShippingAddressSchema = z.object({
  fullName: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(2).max(50),
  postalCode: z.string().min(3).max(10),
  country: z.string().length(2, 'Must be ISO 3166-1 alpha-2'),
});

export const OrderSchema = z.object({
  id: z.string().uuid(),
  orderNumber: z.string().min(1),
  customerId: z.string().uuid(),
  customerEmail: z.string().email(),
  items: z.array(OrderLineItemSchema).min(1),
  shippingAddress: ShippingAddressSchema,
  subtotalCents: z.number().int().nonnegative(),
  shippingCents: z.number().int().nonnegative(),
  taxCents: z.number().int().nonnegative(),
  totalCents: z.number().int().positive(),
  status: OrderStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateOrderSchema = OrderSchema.omit({
  id: true,
  orderNumber: true,
  status: true,
  subtotalCents: true,
  taxCents: true,
  totalCents: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  shippingCents: z.number().int().nonnegative().default(0),
});

export const UpdateOrderStatusSchema = z.object({
  status: OrderStatusSchema,
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>;
