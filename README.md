# FAQ Collector

A web application to collect questions and concerns about Box Office, RAPR, 7star, and AIDS systems.

## Current Version: v1.0.2
- Real-time Google Sheets integration
- Persistent session IDs for tracking submissions
- CSV export functionality
- Stable database schema

## Features
- Submit questions/concerns with category selection
- Toast notifications for feedback
- Session tracking for spam prevention
- CSV export of all submissions
- Real-time Google Sheets synchronization
- PostgreSQL database with Prisma ORM

## Data Management
### Database
Using Neon PostgreSQL with Prisma ORM. The database schema includes:
- Submissions table with content, category, sessionId, and timestamps

### CSV Export
Export all submissions to CSV format:
```bash
npm run export-csv
```
This creates a dated file (e.g., `faq-submissions-2025-03-20.csv`) in the `exports` directory.

### Google Sheets Integration
All submissions are automatically synced to a Google Sheet in real-time. The integration:
- Updates the sheet immediately when new submissions are received
- Includes submission ID, content, category, session ID, and timestamp
- Uses service account authentication for secure access
- Gracefully handles connection issues without disrupting submissions

#### Setting up Google Sheets (for deployment)
1. Create a Google Cloud project
2. Enable Google Sheets API
3. Create a service account and download credentials
4. Share your target Google Sheet with the service account email
5. Add these environment variables to your deployment:
   - `GOOGLE_APPLICATION_CREDENTIALS`: Service account JSON credentials
   - `GOOGLE_SHEETS_ID`: Your Google Sheet ID

## Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment
The application is deployed on Vercel at https://faq-collector.vercel.app/

### Environment Variables
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `GOOGLE_APPLICATION_CREDENTIALS`: Google service account JSON
- `GOOGLE_SHEETS_ID`: Target Google Sheet ID

## Version History
- v1.0.2 (Current)
  - Added real-time Google Sheets integration
  - Improved documentation
- v1.0.1
  - Added CSV export functionality
  - Added session persistence for spam tracking
- v1.0.0 
  - Initial stable release
  - Basic submission functionality
  - Database integration

## Reverting to Stable Versions
To revert to a stable version:
```bash
git checkout v1.0.2  # Latest with Google Sheets integration
git checkout v1.0.1  # Version with CSV exports
git checkout v1.0.0  # Initial stable release
```

## Tech Stack
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- PostgreSQL with Prisma
- Google Sheets API
