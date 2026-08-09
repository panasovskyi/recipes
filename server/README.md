# Смакота — Backend

REST API for the Смакота recipe platform, built with Express 5, TypeScript, and Prisma.

## Tech stack

- **Node.js** + **Express 5**
- **PostgreSQL** + **Prisma ORM**
- **Zod** — request validation (body, query, and params)
- **JWT** — access tokens (short-lived) + refresh tokens (httpOnly cookie, rotated on refresh)
- **bcrypt** — password hashing
- **Multer** + **Cloudinary** — recipe image upload and storage
- **Helmet** — security headers
- **express-rate-limit** — rate limiting on `/auth/login` and `/auth/register` to slow down brute-force attempts
- **tsx** — TypeScript execution / dev watch mode

## Architecture

Layered structure, one direction of dependency:

```
routes → middlewares (auth / validate / rate limit) → controllers → services → Prisma
```

- **controllers** — parse the request, call a service, shape the response
- **services** — business logic and all Prisma calls
- **dtos** — transform/normalize raw request data before it hits validation or a service
- **validations** — Zod schemas per route
- **middlewares** — `authMiddleware` (required auth), `optionalAuthMiddleware` (public routes that personalize when logged in), `validate` (Zod), `authRateLimiter`, centralized `errorMiddleware`

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

| Variable                | Description                                                 |
| ------------------------ | ------------------------------------------------------------- |
| `PORT`                  | Port the server listens on                                  |
| `NODE_ENV`               | `development` \| `production`                                |
| `DB_USER` / `DB_PASSWORD` / `DB_NAME` / `DB_HOST` / `DB_PORT` | Individual Postgres connection params (used to build `DATABASE_URL`) |
| `DATABASE_URL`          | Postgres connection string used by Prisma                    |
| `JWT_ACCESS_SECRET`      | Secret for signing access tokens                              |
| `JWT_REFRESH_SECRET`     | Secret for signing refresh tokens                              |
| `CLIENT_URL`             | Frontend origin, used for CORS                                |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary account cloud name                                  |
| `CLOUDINARY_API_KEY`     | Cloudinary API key                                             |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret                                          |

Generate strong secrets for the JWT variables, e.g.:

```bash
openssl rand -base64 32
```

> If you deploy the database on [Neon](https://neon.tech) and later switch to their pooled connection, add a separate `DIRECT_URL` (non-pooled) for running migrations — not needed for a single `DATABASE_URL` setup like the current one.

### 3. Set up the database

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run the dev server

```bash
npm run dev
```

The API will be available at `http://localhost:<PORT>/api`.

## Auth flow

- On login/register, the server issues a short-lived **access token** (returned in the response body) and a long-lived **refresh token** (set as an httpOnly cookie).
- The client attaches the access token as `Authorization: Bearer <token>` on every request.
- When the access token expires, the client calls `GET /api/auth/refresh` (cookie sent automatically) to get a new one — refresh tokens are rotated on each use.
- Protected routes require a valid access token (`authMiddleware`); some public routes (like viewing a single recipe) use `optionalAuthMiddleware` to personalize the response (e.g. `isSaved`) when a valid token is present, without requiring one.
- `/auth/login` and `/auth/register` are rate-limited (10 requests / 15 minutes per IP) to slow down brute-force attempts.

## Deployment notes

- Database hosted on [Neon](https://neon.tech).
- Deployed on [Render](https://render.com) as a Web Service, root directory set to `server/`.
- Remember to set `CLIENT_URL` to the deployed frontend's real origin — CORS will block requests otherwise.
- Run `npx prisma migrate deploy` (not `migrate dev`) as part of the deploy/build step in production.
