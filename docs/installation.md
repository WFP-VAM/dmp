# Installation

- [Install fnm](https://github.com/Schniz/fnm#installation) or another node version manager (I *highly* recommend use-on-cd option)
- Use the correct node version: `fnm use`
- [Install pnpm](https://pnpm.io/installation)
- Then run `pnpm install`


## Start the app

What you need to do to (re)start the project:

- Follow the [backend README](../apps/backend/README.md) (`.env.rc`, `docker compose up -d`, `pnpm migration:run`)
- From the repo root: `pnpm dev` (backend on :8000, frontend on :3000)

On first boot the backend seeds `superadmin@superadmin.com` / `SUPERADMIN_PASSWORD` as an `admin` user (see root README "Local login"). Use that to sign in at http://localhost:3000.

To create another user, `POST /users` needs an **admin** JWT and a `roles` array (`admin`, `ncdm`, or `pcdm`):

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
  "email":"username@email.com",
  "password":"password",
  "roles": ["ncdm"]
}'
```
