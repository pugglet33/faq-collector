# FAQ Collector

A web application for collecting questions and concerns about Box Office, RAPR, 7star, and AIDS systems.

## Features

- Simple, user-friendly interface
- Category-based question submission
- Session tracking for user submissions
- Toast notifications for feedback
- PostgreSQL database with Prisma ORM

## Tech Stack

- Next.js 14 (React framework)
- React 18
- TypeScript
- TailwindCSS for styling
- PostgreSQL database
- Prisma 6.2.1 as ORM

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables by creating a `.env` file with:
```
DATABASE_URL="postgresql://user:password@host:port/database"
```

3. Initialize the database:
```bash
npx prisma db push
```

4. Run the development server:
```bash
npm run dev
```

## Deploying to Vercel

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com/new) and import your repository
3. Add the required environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
4. Deploy!
