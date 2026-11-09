import { z } from 'zod';

export const WaistSizeSchema = z.union([
  z.literal(30), z.literal(31), z.literal(32), z.literal(33), z.literal(34),
  z.literal(35), z.literal(36), z.literal(38), z.literal(40), z.literal(42),
  z.literal(44), z.literal(46), z.literal(48),
]);

export const LegLengthSchema = z.union([
  z.literal(28), z.literal(30), z.literal(32), z.literal(34), z.literal(36),
]);

export const WashTypeSchema = z.enum([
  'raw',
  'light-wash',
  'mid-wash',
  'dark-wash',
  'black',
  'acid-wash',
  'distressed',
]);

export const ProductVariantSchema = z.object({
  id: z.string().uuid(),
  waist: WaistSizeSchema,
  length: LegLengthSchema,
  wash: WashTypeSchema,
  sku: z.string().min(1).max(50),
  stock: z.number().int().nonnegative(),
  priceModifier: z.number().int(),
});

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string(),
  basePriceCents: z.number().int().positive(),
  imageUrls: z.array(z.string().url()).min(1),
  variants: z.array(ProductVariantSchema),
  tags: z.array(z.string()),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateProductSchema = CreateProductSchema.partial();

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
