import type { FastifyInstance } from 'fastify';
import { CreateProductSchema, UpdateProductSchema } from '@rjdenim/shared-types';
import { getPool } from '../db/pool.js';

export async function productRoutes(app: FastifyInstance): Promise<void> {
  const pool = getPool();

  app.get('/products', async (_req, reply) => {
    const { rows } = await pool.query(
      `SELECT id, name, slug, base_price_cents, is_active, created_at
       FROM products
       WHERE is_active = true
       ORDER BY created_at DESC`
    );
    return reply.send(rows);
  });

  app.get<{ Params: { id: string } }>('/products/:id', async (req, reply) => {
    const { rows } = await pool.query(
      `SELECT p.*, json_agg(v.*) AS variants
       FROM products p
       LEFT JOIN product_variants v ON v.product_id = p.id
       WHERE p.id = $1
       GROUP BY p.id`,
      [req.params.id]
    );
    if (!rows.length) return reply.status(404).send({ error: 'Product not found' });
    return reply.send(rows[0]);
  });

  app.post('/products', async (req, reply) => {
    const parsed = CreateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }
    // TODO: persist to DB
    return reply.status(201).send({ data: parsed.data });
  });

  app.patch<{ Params: { id: string } }>('/products/:id', async (req, reply) => {
    const parsed = UpdateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }
    // TODO: update in DB
    return reply.send({ id: req.params.id, ...parsed.data });
  });

  app.delete<{ Params: { id: string } }>('/products/:id', async (req, reply) => {
    await pool.query(
      'UPDATE products SET is_active = false, updated_at = NOW() WHERE id = $1',
      [req.params.id]
    );
    return reply.status(204).send();
  });
}
