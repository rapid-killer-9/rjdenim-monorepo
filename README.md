# RJ Denim Monorepo

Premium denim e-commerce platform — monorepo managed with **npm workspaces**.

---

## Repository layout

```
rjdenim-monorepo/
├── apps/
│   ├── web-store/          Next.js 15 storefront        :3000
│   └── admin-dashboard/    Next.js 15 order management  :3001
├── services/
│   └── api-backend/        Fastify 5 REST API           :4000
└── packages/
    └── shared-types/       TypeScript interfaces + Zod schemas
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Monorepo | npm workspaces |
| Language | TypeScript 5.7 (strict) |
| Storefront | Next.js 15, React 19, Tailwind CSS 4 |
| Admin | Next.js 15, React 19, Tailwind CSS 4 |
| API | Fastify 5, `@fastify/helmet`, `@fastify/rate-limit`, `@fastify/cors` |
| Database | PostgreSQL via `pg` (pool), targeting Neon serverless |
| Validation | Zod 3 (shared between frontend and backend) |

---

## Prerequisites

| Tool | Minimum version |
|---|---|
| Node.js | 20 LTS |
| npm | 10 |

Check your versions:

```bash
node -v
npm -v
```

---

## Getting started

### 1. Clone and install

```bash
git clone <repo-url> rjdenim-monorepo
cd rjdenim-monorepo
npm install
```

`npm install` at the root resolves and links all workspace packages in one pass. No need to `cd` into individual directories.

### 2. Set up environment variables

```bash
# API backend (required for database connectivity)
cp services/api-backend/.env.example services/api-backend/.env
```

Open `services/api-backend/.env` and fill in your **Neon** connection string:

```dotenv
PORT=4000
HOST=0.0.0.0
NODE_ENV=development
DATABASE_URL=postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/rjdenim?sslmode=require
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

> Get your `DATABASE_URL` from the **Neon dashboard → your project → Connection string**.  
> The web-store and admin-dashboard have no `.env` requirements for local development.

---

## Running the project

### Run everything at once (recommended)

```bash
npm run dev
```

This starts four processes concurrently with colour-coded output:

| Colour | Process | URL |
|---|---|---|
| Blue | `shared-types` watch compiler | — |
| Yellow | `api-backend` (tsx watch) | http://localhost:4000 |
| Green | `web-store` (Next.js dev) | http://localhost:3000 |
| Magenta | `admin-dashboard` (Next.js dev) | http://localhost:3001 |

### Run individual workspaces

```bash
# Storefront only
npm run dev:web

# Admin dashboard only
npm run dev:admin

# API backend only
npm run dev:api
```

Or use npm's `-w` flag directly:

```bash
npm run dev -w apps/web-store
npm run dev -w apps/admin-dashboard
npm run dev -w services/api-backend
npm run dev -w packages/shared-types
```

---

## Building for production

```bash
# Full build — compiles shared-types first, then all apps/services
npm run build
```

Build order is intentional: `shared-types` emits its `dist/` output before any downstream package compiles.

### Build individual workspaces

```bash
npm run build -w packages/shared-types   # emits to packages/shared-types/dist/
npm run build -w services/api-backend    # emits to services/api-backend/dist/
npm run build -w apps/web-store          # emits to apps/web-store/.next/
npm run build -w apps/admin-dashboard    # emits to apps/admin-dashboard/.next/
```

### Start production servers

```bash
# API
npm run start -w services/api-backend    # node dist/index.js on :4000

# Storefront
npm run start -w apps/web-store          # next start on :3000

# Admin
npm run start -w apps/admin-dashboard    # next start on :3001
```

---

## Type checking

```bash
# All workspaces
npm run type-check

# Individual
npm run type-check -w packages/shared-types
npm run type-check -w services/api-backend
npm run type-check -w apps/web-store
npm run type-check -w apps/admin-dashboard
```

---

## Linting

```bash
# All workspaces that define a lint script
npm run lint

# Individual Next.js apps
npm run lint -w apps/web-store
npm run lint -w apps/admin-dashboard
```

---

## Cleaning build artefacts

```bash
npm run clean
```

Removes all `dist/`, `.next/`, and `node_modules/` directories across the repo. Run `npm install` again afterwards.

---

## Workspace packages

### `packages/shared-types`

Single source of truth for domain types and validation schemas shared across the frontend and backend.

```
src/
  types/
    product.ts      Product, ProductVariant, WaistSize (30–48), LegLength, WashType
    order.ts        Order, OrderLineItem, ShippingAddress, OrderStatus
  schemas/
    product.schema.ts   Zod: ProductSchema, CreateProductSchema, UpdateProductSchema
    order.schema.ts     Zod: OrderSchema, CreateOrderSchema, UpdateOrderStatusSchema
  index.ts          Barrel — re-exports everything
```

**How it's consumed:**  
- Next.js apps use `transpilePackages: ['@rjdenim/shared-types']` — Next.js handles TypeScript transpilation directly from source, no pre-build needed in dev.  
- The API backend uses `tsx` in dev, which resolves TypeScript source natively.  
- Both apps' `tsconfig.json` have a `paths` alias pointing to the source so IDE go-to-definition works across workspaces.  
- For production, run `npm run build -w packages/shared-types` to emit compiled `dist/`.

---

### `services/api-backend`

Fastify 5 REST API running on port **4000**.

```
src/
  db/pool.ts        pg.Pool singleton — Neon SSL config, max 10 connections, graceful close
  plugins/index.ts  Registers helmet, rate-limit (100 req/min), CORS
  routes/
    products.ts     GET /api/v1/products, GET /api/v1/products/:id, POST, PATCH, DELETE
    orders.ts       GET /api/v1/orders, GET /api/v1/orders/:id, POST, PATCH /orders/:id/status
  server.ts         Fastify factory — registers plugins + routes, exposes GET /health
  index.ts          Entry point — dotenv, listen, SIGTERM/SIGINT graceful shutdown
```

**Health check:**

```bash
curl http://localhost:4000/health
# {"status":"ok","timestamp":"...","service":"@rjdenim/api-backend"}
```

**Rate limiting:** 100 requests per IP per minute. Responses include a `Retry-After` style message on `429`.

**Security headers:** `@fastify/helmet` sets `X-Content-Type-Options`, `X-Frame-Options`, HSTS, and others. CSP is enabled in production only.

---

### `apps/web-store`

Next.js 15 App Router storefront on port **3000**.

```
src/
  app/
    layout.tsx      Root layout — metadata, global CSS
    page.tsx        Homepage: hero, wash filter strip, 4-column catalog grid, size guide CTA
    globals.css     Tailwind v4 import + @theme tokens (navy, tan, cream)
  components/
    Header.tsx      Sticky nav with logo, links, cart button
    ProductCard.tsx Image card with wash badge, product name, price
```

**Tailwind v4** — configured via `postcss.config.mjs` (`@tailwindcss/postcss`). No `tailwind.config.ts` needed; custom tokens live in `globals.css` under `@theme`.

---

### `apps/admin-dashboard`

Next.js 15 App Router admin panel on port **3001**.

```
src/
  app/
    layout.tsx      Dark layout — zinc-950 background, robots noindex
    page.tsx        Stat tiles (orders / pending / revenue / AOV) + recent orders table
    globals.css     Tailwind v4 import + @theme tokens
  components/
    OrderTable.tsx  Responsive table — order number, customer, items, total, status, date
    StatusBadge.tsx Colour-coded pill for all 7 OrderStatus values
```

| Status | Colour |
|---|---|
| pending | Amber |
| confirmed | Sky |
| processing | Indigo |
| shipped | Violet |
| delivered | Emerald |
| cancelled | Red |
| refunded | Zinc |

---

## API reference

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Liveness check |
| `GET` | `/api/v1/products` | List active products |
| `GET` | `/api/v1/products/:id` | Single product with variants |
| `POST` | `/api/v1/products` | Create product (Zod-validated) |
| `PATCH` | `/api/v1/products/:id` | Partial update |
| `DELETE` | `/api/v1/products/:id` | Soft-delete (sets `is_active = false`) |
| `GET` | `/api/v1/orders` | List orders (optional `?status=` filter) |
| `GET` | `/api/v1/orders/:id` | Single order with line items |
| `POST` | `/api/v1/orders` | Create order (Zod-validated) |
| `PATCH` | `/api/v1/orders/:id/status` | Update order status |

All validation errors return `400` with a `{ error: { fieldErrors, formErrors } }` body from `zod.flatten()`.

---

## Database (Neon PostgreSQL)

The API is pre-wired to connect to Neon via a standard `pg.Pool`. The pool:

- Uses SSL (`rejectUnauthorized: false`) in production
- Max 10 connections, 30 s idle timeout, 10 s connect timeout
- Closes cleanly on `SIGTERM` / `SIGINT`

Schema migrations are not included in this skeleton — use your preferred migration tool (e.g. `node-postgres` raw SQL files, Drizzle ORM, or Flyway) pointed at your `DATABASE_URL`.

Suggested tables to create:

```sql
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  base_price_cents INT NOT NULL,
  image_urls      TEXT[],
  tags            TEXT[],
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE product_variants (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  waist           INT NOT NULL,
  length          INT NOT NULL,
  wash            TEXT NOT NULL,
  sku             TEXT NOT NULL UNIQUE,
  stock           INT NOT NULL DEFAULT 0,
  price_modifier  INT NOT NULL DEFAULT 0
);

CREATE TABLE orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number    TEXT NOT NULL UNIQUE,
  customer_id     UUID NOT NULL,
  customer_email  TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  subtotal_cents  INT NOT NULL,
  shipping_cents  INT NOT NULL DEFAULT 0,
  tax_cents       INT NOT NULL DEFAULT 0,
  total_cents     INT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_line_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  variant_id      UUID NOT NULL,
  sku             TEXT NOT NULL,
  product_name    TEXT NOT NULL,
  wash            TEXT NOT NULL,
  waist           INT NOT NULL,
  length          INT NOT NULL,
  quantity        INT NOT NULL,
  unit_price_cents INT NOT NULL
);
```

---

## Environment variables reference

### `services/api-backend/.env`

| Variable | Default | Description |
|---|---|---|
| `PORT` | `4000` | Port the Fastify server listens on |
| `HOST` | `0.0.0.0` | Bind address |
| `NODE_ENV` | `development` | Controls SSL, log level, CSP |
| `DATABASE_URL` | — | Neon PostgreSQL connection string |
| `CORS_ORIGIN` | `http://localhost:3000` | Comma-separated allowed origins |

---

## Adding a new workspace package

```bash
mkdir packages/my-package
cd packages/my-package
# create package.json with "name": "@rjdenim/my-package"
```

Then in any app/service that needs it:

```json
"dependencies": {
  "@rjdenim/my-package": "*"
}
```

Run `npm install` from the root — npm workspaces handles the symlink automatically.
