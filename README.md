# DPM

The World Food Program Cambodia supports the National Committee for Disaster Management (NCDM) and their provincial counterparts (PCDM) on the use of mobile data collection tools to capture information on disasters.

This DPM project is a form management tool. It provides the ability to manage users and campaigns as it relates to the disaster relief within Cambodia's provinces.

### Getting Started

## Installation

- [Install fnm](https://github.com/Schniz/fnm#installation) or another node version manager (I _highly_ recommend use-on-cd option)
- Use the correct node version (version defined in .nvmrc): `fnm use`
- [Install pnpm](https://pnpm.io/installation)
- [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Setup

Fill `KOBO_TOKEN`, `FLOOD_ASSET_ID`, `DROUGHT_ASSET_ID`, `INCIDENT_ASSET_ID` in `.env.example.rc` and `.env.test.rc`.

```bash
# Install dependencies
pnpm install
# Create local env file
cp .env.example.rc .env.rc
```

## Running the app

```bash
# Start database
docker compose up -d

# Execute migrations
pnpm migration:run

# Start dev server
pnpm dev
```

## Test

```bash
# unit tests
pnpm test

# test coverage
pnpm test:coverage
```

## Migrations

```bash
# Generate a migration
pnpm migration:generate migration/YourMigrationName

# Run all pending migrations
pnpm migration:run
```
