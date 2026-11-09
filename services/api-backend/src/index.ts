import 'dotenv/config';
import { buildServer } from './server.js';
import { closePool } from './db/pool.js';

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.HOST ?? '0.0.0.0';

async function main() {
  const app = await buildServer();

  const gracefulShutdown = async (signal: string) => {
    app.log.info(`Received ${signal} — shutting down`);
    await app.close();
    await closePool();
    process.exit(0);
  };

  process.once('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.once('SIGINT', () => gracefulShutdown('SIGINT'));

  try {
    await app.listen({ port: PORT, host: HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
