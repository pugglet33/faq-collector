import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const prisma = new PrismaClient();

// Initialize auth client for Google Sheets
const getAuthClient = () => {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is required');
  }

  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  return new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

async function resetDatabase() {
  try {
    // Delete all submissions from database
    await prisma.submission.deleteMany({});
    console.log('✅ Database cleared successfully');

    // Clear Google Sheet
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID || '1Z2XBTGx2CQM3E4po9ZIcLAMxu8hPznSpGGPi9Wji-CY';

    // Clear everything except header row
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Sheet1!A2:E',
    });
    console.log('✅ Google Sheet cleared successfully');

  } catch (error) {
    console.error('Error resetting data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
