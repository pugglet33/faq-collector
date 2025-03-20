# FAQ Collector

A web application to collect questions and concerns about Box Office, RAPR, 7star, and AIDS systems.

## Current Version: v1.0.1
- Persistent session IDs for tracking submissions
- CSV export functionality
- Stable database schema

## Features
- Submit questions/concerns with category selection
- Toast notifications for feedback
- Session tracking for spam prevention
- CSV export of all submissions
- PostgreSQL database with Prisma ORM

## Stable Versions
- v1.0.1 - Added session persistence and CSV exports
- v1.0.0 - Initial stable release with basic submission functionality

## Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Export submissions to CSV
npm run export-csv
```

## Database
Using Neon PostgreSQL with Prisma ORM. The database schema is stable and includes:
- Submissions table with content, category, sessionId, and timestamps

## Deployment
The application is deployed on Vercel at https://faq-collector.vercel.app/

## Reverting to Stable Versions
To revert to a stable version:
```bash
git checkout v1.0.1  # For latest stable with session tracking and CSV export
git checkout v1.0.0  # For initial stable release
```
