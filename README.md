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
                                                           ├──▶ Postgres — users + AdminJS sessions
frontend (Next.js) ───────REST API + JWT cookie────────────┘
     (staff review/validate/edit forms, manage users, auth)

AdminJS (mounted at /admin on the backend) — back-office for admins to manage users
```

- **backend**: exposes REST endpoints for auth, users, Kobo forms (flood/drought/incident) and a webhook endpoint
  that Kobo calls on new submissions. It talks to Kobo's API to fetch/patch form data (forms themselves stay in
  Kobo, not in Postgres). Postgres holds `users` plus AdminJS cookie sessions. JWT access tokens are short-lived
  (10 min); the refresh token is an httpOnly cookie, not a DB row. Telegram channels get notified on new
  submissions.
- **frontend**: the staff-facing UI to log in, browse/validate/edit flood, drought and incident reports, and view
  summary reports. It calls `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8000`) with credentials.
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
   secrets) and start the database/migrations (`docker compose up -d` then `pnpm migration:run` from
   `apps/backend`).
6. Start both apps from the repo root:
   - `pnpm dev` (runs `turbo dev` across `apps/*`), or per-app via `pnpm --filter backend dev` /
     `pnpm --filter frontend dev`.
   - API: http://localhost:8000 — UI: http://localhost:3000
   - Frontend `postinstall` copies `apps/frontend/.env.sample` → `.env.local` if missing
     (`NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`).

### Local login

On backend boot, `UserService.onModuleInit` seeds an admin **into the `users` table** from env (no-op if that
email already exists). Defaults from `apps/backend/.env.example.rc`:

| Field | Value |
| --- | --- |
| Email | `superadmin@superadmin.com` (`${SUPERADMIN_USERNAME}@superadmin.com`) |
| Password | `SUPERADMIN_PASSWORD` (default `password`) |
| Roles | `admin` |

Use that pair for both:

- Staff UI at http://localhost:3000 (`POST /auth/jwt/create` → `{ access }`; refresh token is an httpOnly
  `refresh_token` cookie).
- AdminJS at http://localhost:8000/admin (same env pair, **or** any `users` row with role `admin`).

`POST /users` is admin-only and requires a `roles` array. Valid roles used in the app: `admin`, `ncdm`,
`pcdm`. `admin`/`ncdm` see all provinces; `pcdm` **must** have a `province` or Kobo queries fail.

```sh
TOKEN=$(curl -s --request POST --url http://localhost:8000/auth/jwt/create \
  --header 'Content-Type: application/json' \
  --data '{"email":"superadmin@superadmin.com","password":"password"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['access'])")

curl --request POST \
  --url http://localhost:8000/users \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer $TOKEN" \
  --data '{
  "name": "username",
  "email": "username@email.com",
  "password": "password",
  "roles": ["ncdm"]
}'
```

CORS matchers live in `apps/backend/src/utils/allowedOrigins.ts` (`ALLOWED_HOST`, GH Pages, surge,
`*.dmp.ovio.org`). Extra `http://localhost` ports are allowed only when `NODE_ENV` is `development` or
`test`. If the frontend runs on a non-default port in local dev, either rely on that localhost matcher
or set `ALLOWED_HOST` in `apps/backend/.env.rc` to match, e.g. `http://localhost:3001`.

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
