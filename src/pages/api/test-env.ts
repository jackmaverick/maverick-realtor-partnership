import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const hasGoogleCreds = !!(process.env.GOOGLE_SHEETS_CREDENTIALS || import.meta.env.GOOGLE_SHEETS_CREDENTIALS);
  const hasSpreadsheetId = !!(process.env.GOOGLE_SHEETS_SPREADSHEET_ID || import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID);
  const hasGmailUser = !!(process.env.GMAIL_USER || import.meta.env.GMAIL_USER);
  const hasGmailPassword = !!(process.env.GMAIL_APP_PASSWORD || import.meta.env.GMAIL_APP_PASSWORD);

  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  return new Response(
    JSON.stringify({
      hasGoogleCreds,
      hasSpreadsheetId,
      hasGmailUser,
      hasGmailPassword,
      spreadsheetId: spreadsheetId ? `${spreadsheetId.substring(0, 10)}...` : 'NOT FOUND',
      envKeys: Object.keys(process.env).filter(key => key.includes('GOOGLE') || key.includes('GMAIL'))
    }, null, 2),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
