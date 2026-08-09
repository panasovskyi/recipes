# Смакота — Recipe Discovery App

A full-stack recipe platform where users can browse, search, and save recipes, filter by ingredients they already have, and share their own recipes with the community.

🔗 **Live demo:** [add your Render frontend URL here]
🔗 **API:** [add your Render backend URL here]

## What it does

- Browse recipes by category and subcategory, with pagination and sorting
- Search recipes by name or by ingredients on hand ("what's in my fridge")
- "Recipe of the day" and "Popular recipes" on the homepage
- User authentication with JWT (access + refresh tokens, httpOnly cookies)
- Create recipes with image upload (stored on Cloudinary)
- Save/unsave recipes to a personal favorites list
- User profile with "My recipes" and "Saved recipes", each paginated
- Fully responsive layout

## Tech stack

**Frontend** — React 19, TypeScript, Vite, Redux Toolkit, React Hook Form + Zod, React Router, Axios, SCSS Modules

**Backend** — Node.js, Express 5, PostgreSQL, Prisma ORM, Zod, JWT auth, Multer + Cloudinary, bcrypt, Helmet, rate limiting

**Infrastructure** — PostgreSQL hosted on [Neon](https://neon.tech), frontend and backend deployed separately on [Render](https://render.com)

## Project structure

```
.
├── client/   # React frontend — see client/README.md
└── server/   # Express API — see server/README.md
```

Each folder is a self-contained project with its own `package.json`, dependencies, and `.env.example`. There's no shared root config — each side runs and deploys independently.

## Getting started

Clone the repo, then set up each side separately:

```bash
git clone <your-repo-url>
cd recipe

# backend
cd server && npm install
# → see server/README.md for env setup and DB migration

# frontend
cd ../client && npm install
# → see client/README.md for env setup
```

## License

MIT — see [LICENSE](./LICENSE).
