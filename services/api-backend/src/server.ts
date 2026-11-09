import Fastify from 'fastify';
import { registerPlugins } from './plugins/index.js';
import { productRoutes } from './routes/products.js';
import { orderRoutes } from './routes/orders.js';

export async function buildServer() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } }
          : undefined,
    },
    trustProxy: true,
  });

  await registerPlugins(app);

  app.get('/health', async () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: '@rjdenim/api-backend',
  }));

  await app.register(productRoutes, { prefix: '/api/v1' });
  await app.register(orderRoutes, { prefix: '/api/v1' });

  return app;
}
