# DMP — Disaster Monitoring Platform

The World Food Program (WFP) Cambodia supports the National Committee for Disaster Management (NCDM) and their
provincial counterparts (PCDM) in using mobile data collection tools to capture information on disasters (floods,
droughts, and other incidents).

DMP is a form-management tool built on top of that data. It:

- Pulls flood, drought and incident survey submissions from **KoboToolbox** (a mobile/web data collection platform).
- Lets NCDM/PCDM staff review, validate and edit those submissions through a web app.
- Sends **Telegram** notifications to NCDM/PCDM channels when new forms come in.
- Manages users and roles (with an AdminJS back-office for admins).
- Is deployed to AWS via CDK.

## Repo layout

This is a pnpm/Turborepo monorepo:

```
apps/
  backend/                 NestJS API — Kobo integration, auth, users, webhooks, AdminJS back-office
  backend-infrastructure/  AWS CDK app that deploys the backend (ECS, ALB, RDS, Route53, WAF, ...)
  frontend/                Next.js web app used by NCDM/PCDM staff
packages/
  interfaces/              Shared TypeScript DTOs/mappings for Kobo forms & users, used by both apps
  eslint-config-custom/    Shared ESLint config
  dependency-cruiser-config-custom/  Shared dependency-cruiser config
  tsconfig/                Shared base tsconfig files
docs/
  installation.md          Monorepo-wide install/run instructions
```

Each package/app has its own README with more detail:

- [apps/backend/README.md](apps/backend/README.md) — env setup, running the API, migrations, Telegram/Kobo webhook setup
- [apps/frontend/README.md](apps/frontend/README.md) — architecture, design, auth, error handling, deploy docs
- [apps/backend-infrastructure/README.md](apps/backend-infrastructure/README.md) — CDK deployment instructions

## How the pieces fit together

```
KoboToolbox  ──(REST webhook on new submission)──▶  backend (NestJS)
     ▲                                                  │
     │  polled/fetched via Kobo API                      ├──▶ Telegram (NCDM/PCDM chat notifications)
     └──────────────────────────────────────────────────┘│
                                                           ├──▶ Postgres (via TypeORM) — users, sessions
frontend (Next.js) ───────REST API─────────────────────────┘
     (staff review/validate/edit forms, manage users, auth)

AdminJS (mounted at /admin on the backend) — back-office for admins to manage raw data
```

- **backend**: exposes REST endpoints for auth, users, Kobo forms (flood/drought/incident) and a webhook endpoint
  that Kobo calls on new submissions. It talks to Kobo's API to fetch/patch form data, stores users/sessions in
  Postgres, and notifies Telegram channels.
- **frontend**: the staff-facing UI to log in, browse/validate/edit flood, drought and incident reports, and view
  summary reports.
- **packages/interfaces**: shared DTOs and Kobo→app field mappings so backend and frontend stay in sync when Kobo
  forms change (see the "Updating KOBO Tables" section in the frontend README for the workflow).
- **backend-infrastructure**: CDK stack that provisions the AWS resources (ECS service, ALB, RDS, Route53, WAF) the
  backend runs on.

## Getting started

Prerequisites and day-to-day dev commands live in [docs/installation.md](docs/installation.md). In short:

1. [Install fnm](https://github.com/Schniz/fnm#installation) (or another node version manager) and run `fnm use`
   to pick up the version in `.nvmrc`.
2. [Install pnpm](https://pnpm.io/installation).
3. [Install Docker Desktop](https://www.docker.com/products/docker-desktop/) (used for the local Postgres DB).
4. Run `pnpm install` from the repo root.
5. Follow the [backend README](apps/backend/README.md) to configure `.env.rc`/`.env.test.rc` (Kobo + Telegram
   secrets) and start the database/migrations.
6. Start both apps from the repo root:
   - `pnpm dev` (runs `turbo dev` across `apps/*`), or per-app via `pnpm --filter backend dev` /
     `pnpm --filter frontend dev`.

To create a user to sign in with locally, `POST /users` requires an **admin** JWT and a `roles` array
(there's no bootstrap admin user — see the "First admin user" note below):

```sh
TOKEN=$(curl -s --request POST --url http://localhost:8000/auth/jwt/create \
  --header 'Content-Type: application/json' \
  --data '{"email":"<an-existing-admin-email>","password":"<their-password>"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['access'])")

curl --request POST \
  --url http://localhost:8000/users \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $TOKEN" \
  --data '{
  "name": "username",
  "email": "username@email.com",
  "password": "password",
  "roles": ["user"]
}'
```

**First admin user:** the `SUPERADMIN_USERNAME`/`SUPERADMIN_PASSWORD` env vars only log you into the AdminJS
back-office at `/admin` — they don't correspond to a row in the `users` table, so they can't get you a JWT via
`/auth/jwt/create`. To create your first real admin user for local dev, either use the AdminJS UI at
`http://localhost:8000/admin`, or insert one directly, e.g.:

```sh
# from apps/backend, with the local Postgres container running
node -e "require('bcrypt').hash('password', 10).then(console.log)"
# then, using the hash printed above:
docker compose exec db psql -U nestjs -d api -c \
  "INSERT INTO users (name, password, email, roles) VALUES ('Local Admin', '<hash>', 'admin@example.com', ARRAY['admin']);"
```

**Note:** the backend's `ALLOWED_HOST` env var (in `apps/backend/.env.rc`) must match the origin the frontend
actually runs on (CORS is enforced in `apps/backend/src/main.ts`) — if you run the frontend on a non-default
port (e.g. because `3000` is already taken by another project), update `ALLOWED_HOST` to match, e.g.
`http://localhost:3001`.

## Common root scripts

Run from the repo root (they fan out to every app/package via Turborepo):

| Script | Description |
| --- | --- |
| `pnpm dev` | Start backend + frontend in watch mode |
| `pnpm build` | Build all apps/packages |
| `pnpm test` | Run all test suites |
| `pnpm test:unit` | Run unit tests only |
| `pnpm test:type` | Type-check all packages |
| `pnpm test:circular` | Check for circular dependencies |
| `pnpm lint` / `pnpm lint:fix` | Lint (and autofix) all packages |
| `pnpm security` | Run `audit-ci` against dependencies |

## CI/CD

GitHub Actions workflows live in [.github/workflows](.github/workflows):

- `ci.yml` — runs on PRs (lint, test, build, etc.)
- `merge-staging.yml` / `merge-production.yml` — deploy on merge to the respective branches

## Further reading

- [Frontend architecture](apps/frontend/docs/architecture.md), [design](apps/frontend/docs/design.md),
  [authentication](apps/frontend/docs/authentication.md), [error handling](apps/frontend/docs/error-handling.md)
- [Backend README](apps/backend/README.md) — migrations, Telegram bot setup, Kobo webhook configuration
- [Infrastructure README](apps/backend-infrastructure/README.md) — CDK deploy commands and required secrets
