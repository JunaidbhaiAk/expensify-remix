## Expensify Remix

Full‑stack expense tracking app built with React Router (SSR), Prisma, PostgreSQL, TypeScript, Vite, and Tailwind CSS.

### Highlights
- **SSR by default** with React Router 7
- **TypeScript** strict mode
- **Prisma ORM** with a Postgres datasource
- **Tailwind CSS v4** via the Vite plugin
- **App routes** with loaders/actions and nested layouts
- **Dockerfile** for production image builds


## Table of Contents
- Installation
- Environment Variables
- Database (Prisma + Postgres)
- Development
- Build & Run (Production)
- Docker
- Code Structure
- TypeScript & Paths
- Styling
- Available Scripts
- Deployment
- Troubleshooting


## Installation

Prerequisites:
- Node.js 20+
- PostgreSQL 14+ (local or managed)
- npm 10+

Install dependencies:
```bash
npm install
```


## Environment Variables

Create a `.env` file in the project root:
```bash
# Required by Prisma (primary connection used by the app)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"

# Optional: used by Prisma Migrate in some setups (e.g., pgbouncer)
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"

# Optional: app port for production serve (defaults to 3000)
PORT=3000
```

Notes:
- `DATABASE_URL` is mandatory. `DIRECT_URL` is recommended when you use connection proxies like PgBouncer. Both are referenced in `prisma/schema.prisma`.
- React Router SSR server honors `PORT` when serving the built app.


## Database (Prisma + Postgres)

Prisma is configured for PostgreSQL:
```
prisma/schema.prisma
```

Common workflows:
```bash
# 1) Generate the Prisma client (usually done automatically post-install)
npx prisma generate

# 2) Create and apply migrations (dev)
npx prisma migrate dev --name init

# 3) Apply existing migrations in CI/Prod
npx prisma migrate deploy

# 4) Seed local data
npm run seed
```

Seeding details:
- `prisma/seed.ts` inserts 30 example expenses across 2025 (categories: Food, Transportation, Housing, Utilities, Entertainment).
- Ensure your database is reachable and migrated before running `npm run seed`.


## Development

Start the dev server with SSR + HMR:
```bash
npm run dev
```

Defaults to `http://localhost:5173` in development. Type generation for routes can be produced via:
```bash
npm run typecheck
```
This runs `react-router typegen` followed by `tsc`.


## Build & Run (Production)

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

By default the app listens on `PORT` (3000 if unset). The build output lives in `build/client` (static assets) and `build/server` (SSR entry).


## Docker

This repo includes a multi‑stage `Dockerfile` that installs deps, builds the app, and packages only what’s needed at runtime.

Build the image:
```bash
docker build -t expensify-remix .
```

Run the container (supply envs):
```bash
docker run --rm -p 3000:3000 \
  -e DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public" \
  -e DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public" \
  -e PORT=3000 \
  expensify-remix
```

Alternatively, use an env file:
```bash
docker run --rm -p 3000:3000 --env-file .env expensify-remix
```


## Code Structure

High‑level layout:
```
app/
  app.css
  components/
    ui/                 # Design‑system primitives (button, input, table, etc.)
    expenses/           # Expense feature components (forms, list, validators)
    dashboard/          # Dashboard widgets (charts, cards, skeleton)
  hooks/                # Reusable hooks
  lib/                  # Utilities, Prisma client, types, constants
  routes/               # Route modules (pages, layouts, nested routes)
  root.tsx              # App root, document, providers
  routes.ts             # Central route definition (if used by dev tooling)

prisma/
  schema.prisma         # Prisma data model + datasource
  migrations/           # SQL migrations
  seed.ts               # Database seeding script

public/                 # Static assets
react-router.config.ts  # React Router SSR configuration (ssr: true)
vite.config.ts          # Vite config (React Router + Tailwind + TS paths)
tsconfig.json           # TS config with path alias ~/* => app/*
```

Routing & Data‑Loading:
- Files in `app/routes` map to route URLs. Nested folders create nested routes and layouts.
- Use React Router loaders/actions for data fetching and mutations.
- The app runs in SSR mode by default (`react-router.config.ts` sets `ssr: true`).

Data Access:
- `app/lib/prisma.ts` initializes a singleton Prisma client for server use.


## TypeScript & Paths

`tsconfig.json` enables strict TypeScript with path aliasing:
```json
{
  "paths": { "~/*": ["./app/*"] }
}
```
Import from anywhere using `~/...` (e.g., `import { prisma } from "~/lib/prisma"`).


## Styling

Tailwind CSS v4 is enabled via `@tailwindcss/vite` in `vite.config.ts`. Global styles live in `app/app.css`. Utility‑first classes are used across `app/components`.


## Available Scripts

From `package.json`:
```json
{
  "build": "react-router build",
  "dev": "react-router dev",
  "start": "react-router-serve ./build/server/index.js",
  "typecheck": "react-router typegen && tsc",
  "seed": "node --loader ts-node/esm prisma/seed.ts"
}
```

Additional useful Prisma commands:
```bash
npx prisma studio          # DB UI
npx prisma format          # Format schema.prisma
npx prisma db pull         # Introspect existing DB
npx prisma migrate dev     # Create & apply a new migration (dev)
npx prisma migrate deploy  # Apply migrations (prod/CI)
```


## Deployment

Two common routes:
- **Containerized**: build the Docker image and deploy to your platform (e.g., AWS ECS, Cloud Run, Azure Container Apps, Fly.io, Railway). Ensure `DATABASE_URL`/`DIRECT_URL` are provided.
- **DIY Node**: copy `package*.json` and the `build/` directory to your server, install production deps, and run `npm start`.

Artifacts to deploy:
```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # SSR server entry
```


## Troubleshooting

- "Prisma: Error validating datasource URL": Check `DATABASE_URL` and network access to Postgres.
- Migrations fail behind PgBouncer: set `DIRECT_URL` to a non‑pooled connection.
- Port conflicts in dev: stop other processes using `5173` or set `VITE_PORT` env; in prod, set `PORT`.
- Types not found for routes: run `npm run typecheck` to regenerate route types.
- Seed duplicates: clear the `Expense` table or adjust `seed.ts` before re‑seeding.


---

Built with ❤️ using React Router, Prisma, TypeScript, and Tailwind CSS.
