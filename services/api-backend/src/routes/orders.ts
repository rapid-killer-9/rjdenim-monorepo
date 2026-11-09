import type { FastifyInstance } from 'fastify';
import { CreateOrderSchema, UpdateOrderStatusSchema } from '@rjdenim/shared-types';
import { getPool } from '../db/pool.js';

export async function orderRoutes(app: FastifyInstance): Promise<void> {
  const pool = getPool();

  app.get('/orders', async (req, reply) => {
    const { status } = req.query as { status?: string };
    const { rows } = await pool.query(
      `SELECT id, order_number, customer_email, total_cents, status, created_at
       FROM orders
       ${status ? 'WHERE status = $1' : ''}
       ORDER BY created_at DESC`,
      status ? [status] : []
    );
    return reply.send(rows);
  });

  app.get<{ Params: { id: string } }>('/orders/:id', async (req, reply) => {
    const { rows } = await pool.query(
      `SELECT o.*, json_agg(li.*) AS items
       FROM orders o
       LEFT JOIN order_line_items li ON li.order_id = o.id
       WHERE o.id = $1
       GROUP BY o.id`,
      [req.params.id]
    );
    if (!rows.length) return reply.status(404).send({ error: 'Order not found' });
    return reply.send(rows[0]);
  });

  app.post('/orders', async (req, reply) => {
    const parsed = CreateOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }
    // TODO: persist to DB, generate order_number, compute totals
    return reply.status(201).send({ data: parsed.data });
  });

  app.patch<{ Params: { id: string } }>('/orders/:id/status', async (req, reply) => {
    const parsed = UpdateOrderStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.flatten() });
    }
    const { rows } = await pool.query(
      `UPDATE orders
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, order_number, status, updated_at`,
      [parsed.data.status, req.params.id]
    );
    if (!rows.length) return reply.status(404).send({ error: 'Order not found' });
    return reply.send(rows[0]);
  });
}
