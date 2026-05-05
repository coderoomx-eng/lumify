# Lumina — AI Image Generation SaaS

Production-oriented starter: Next.js App Router, TypeScript, Tailwind CSS v4, ShadCN UI (Base UI), Prisma ORM **6** with MongoDB, Auth.js (NextAuth v5), Zod, React Hook Form, Axios, and Lucide icons.

## Prerequisites

- Node.js 20+
- A MongoDB database (local or Atlas)

## Setup


1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Set `DATABASE_URL`, `AUTH_SECRET` (e.g. `openssl rand -base64 32`), and `NEXTAUTH_URL` (e.g. `http://localhost:3000`).

3. Push the Prisma schema to MongoDB:

   ```bash
   npx prisma db push
   ```

4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Replacing placeholder generation

The service in `lib/services/image-generation.ts` returns a Picsum URL. Point `app/api/images/generate/route.ts` (or that service) at your real provider and persist the returned URL as today.

## Prisma and MongoDB

This repo uses **Prisma 6.19** because Prisma 7 does not support MongoDB yet. When Prisma ships MongoDB support for v7, you can upgrade following the official migration guide.

## Project layout

- `app/(marketing)/` — public marketing site
- `app/(auth)/` — login and signup
- `app/dashboard/` — authenticated app shell
- `app/api/` — REST-style route handlers
- `auth.config.ts` — Auth.js configuration (edge-safe; Prisma is loaded only inside `authorize`)
- `middleware.ts` — dashboard protection via JWT `getToken` (no Prisma on the Edge bundle)
- `lib/validators/` — Zod schemas
- `prisma/schema.prisma` — `User` and `GeneratedImage` models
