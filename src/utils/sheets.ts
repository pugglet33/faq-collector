import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Initialize auth client
const getAuthClient = () => {
  let credentials;
  
  // Check if we're running on Vercel
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  } else {
    // Local development - load from file
    credentials = require('../../service-account.json');
  }

  return new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

// Initialize sheets client
const getSheets = async () => {
  const auth = getAuthClient();
  return google.sheets({ version: 'v4', auth });
};

// Append row to spreadsheet
export const appendToSheet = async (row: string[]) => {
  try {
    const sheets = await getSheets();
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID || '1Z2XBTGx2CQM3E4po9ZIcLAMxu8hPznSpGGPi9Wji-CY';
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E', // Assumes headers are in row 1
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    console.log('Successfully appended row to Google Sheet');
  } catch (error) {
    console.error('Error appending to sheet:', error);
    // Don't throw the error - we don't want to break the submission if sheets fails
    // Just log it and continue
  }
};
