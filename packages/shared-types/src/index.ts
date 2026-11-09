// --- Types ---
export type {
  WaistSize,
  LegLength,
  WashType,
  ProductVariant,
  Product,
} from './types/product';

export type {
  OrderStatus,
  OrderLineItem,
  ShippingAddress,
  Order,
} from './types/order';

// --- Schemas ---
export {
  WaistSizeSchema,
  LegLengthSchema,
  WashTypeSchema,
  ProductVariantSchema,
  ProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
} from './schemas/product.schema';

export type {
  CreateProductInput,
  UpdateProductInput,
} from './schemas/product.schema';

export {
  OrderStatusSchema,
  OrderLineItemSchema,
  ShippingAddressSchema,
  OrderSchema,
  CreateOrderSchema,
  UpdateOrderStatusSchema,
} from './schemas/order.schema';

export type {
  CreateOrderInput,
  UpdateOrderStatusInput,
} from './schemas/order.schema';
