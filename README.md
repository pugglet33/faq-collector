# FAQ Collector

A web application for collecting questions and concerns about Box Office, RAPR, 7star, and AIDS systems.

## Features
- Simple form for submitting questions and concerns
- Category selection (General, Box Office, RAPR, 7star, AIDS)
- Session tracking for user submissions
- Modern UI with toast notifications
- PostgreSQL database integration

## Tech Stack
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Prisma with Neon PostgreSQL
- Vercel for deployment

## Deployment
The application is deployed at: https://faq-collector.vercel.app/

## Version History
- v1.0.0: First stable version with working form submission and database integration
  - Tagged as `v1.0.0`
  - Available in the `v1` branch

### Reverting to v1
If you need to revert to the stable v1 version:
```bash
git checkout v1
```

Or to revert to the exact v1.0.0 release:
```bash
git checkout v1.0.0
```

## Development
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file
   - Add your Neon PostgreSQL URL:
     ```
     DATABASE_URL=your_neon_postgres_url
     ```
4. Run database migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables
- `DATABASE_URL`: Neon PostgreSQL connection string
