# Frontend

## Prerequisites

[Follow the monorepo installation](../../docs/installation.md)

## Documentation

- 🏛️ [Project architecture](./docs/architecture.md)
- 💅 [Design](./docs/design.md)
- 🔒 [Authentication](./docs/authentication.md)
- 🚨 [Linter and Editor Configuration](./docs/linter-editor.md)
- 💃 [Error handling](./docs/error-handling.md)
- ⬆️ [Upgrading Dependencies](./docs/upgrading-dependencies.md)
- ⬆️ [Audit dependencies](./docs/dependency-security-audit.md)
- 🚀 [Deploy](./docs/deploy.md)

## Updating KOBO Tables

If changes have been made to the KOBO forms, you can follow the step by step below to update the DMP tables and reports.

1. In `/packages/interfaces`:

- Add the new fields to the corresponding Dto file. Eg. [FloodDto.ts](../../packages/interfaces/src/kobo/FloodDto.ts)
- Update the mapping file. Eg. [flood.ts](../../packages/interfaces/src/kobo/mapping/flood.ts)

2. In `frontend`:

- Add the new fields to the table configuration for the main tables. Eg. `FloodFormValidation/tablesConfig/Agriculture.tsx`
- Add the new fields to the report table configuration if required. Eg. `Report/FloodReport/tablesConfig/ReportFoodNeeds.tsx`
- Add the new fields to the summary table configuration if requried. Eg. `Report/FloodReport/tablesConfig/SummaryReport.tsx`

3. In `translations`

- Add the necessary key mapping to both the `en.json` and `km.json` files.
