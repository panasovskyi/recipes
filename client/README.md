# Смакота — Frontend

React frontend for the Смакота recipe platform.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — build tool / dev server
- **Redux Toolkit** — global state (recipes, auth)
- **React Hook Form** + **Zod** — forms and validation
- **React Router** — routing, including protected/public-only routes
- **Axios** — HTTP client, with interceptors for attaching the JWT access token and silently refreshing it on 401
- **use-debounce** — debounced search input
- **SCSS Modules** — styling, with shared design tokens (`_variables.scss`) and breakpoint mixins

## Architecture

```
components/
  layout/      → Header, Footer, Logo (site-wide structure)
  ui/
    atoms/     → Button, Input, Checkbox, Radio, Spinner... (dumb, reusable)
    molecules/ → EmptyState, RecipeCard, RecipesGrid, FormField, Pagination...
pages/         → one folder per route, with page-local sub-components
store/         → Redux Toolkit slices (auth, recipes)
api/           → axios instance + one module per resource (recipes, auth)
hooks/         → shared hooks (auth state, search redirects, pagination)
types/         → domain types, kept in sync with the backend's DTOs/enums
```

Naming convention: PascalCase folders for reusable `ui/` components (folder name = exported component name), kebab-case for feature/page-specific folders.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

| Variable        | Description                                  |
| --------------- | --------------------------------------------- |
| `VITE_API_URL`  | Base URL of the backend API (e.g. `http://localhost:5000/api` locally, or the deployed backend URL) |

### 3. Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### 4. Build for production

```bash
npm run build
npm run preview   # optional — preview the production build locally
```

## Auth

- Access token is kept in Redux (in memory), **not** in `localStorage` — refreshed automatically via an httpOnly cookie on page load and on 401 responses.
- Route guards: `ProtectedRoute` (requires auth, redirects to `/login` otherwise) and `PublicOnlyRoute` (login/registration pages, redirects away if already authenticated).

## Deployment notes

- Deployed on [Render](https://render.com) as a Static Site, root directory set to `client/`, build command `npm run build`, publish directory `dist`.
- Set `VITE_API_URL` as a build-time environment variable on Render — it's baked into the build, not read at runtime.
