This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Vercel - Free Tier hosting
Next.js + Tailwind = quick UI.

# Node.js
For each Node.js project, we need a file called package.json. Its purpose is to store metadata about the project (e.g. name, description, version, author, etc.), and to manage the project dependencies and scripts.
2 options:
recommended
```bash
npx create-next-app@latest frontend --typescript --tailwind
```
What it does:
- Creates Next.js project
- Auto-configures Tailwind with:
- tailwind.config.js (with Next.js defaults)
- postcss.config.js
- Adds necessary devDependencies
- Imports Tailwind directives in globals.css
Best for: Most users who want a zero-config setup

```bash
npx create-next-app@latest frontend --typescript
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Gives you more control over configurations
Requires manual setup of:
- Tailwind directives in CSS
- Content sources in tailwind.config.js



start the development server: http://localhost:3000
```bash
cd frontend
npm run dev

cd backend
poetry run uvicorn app.main:app --reload
```