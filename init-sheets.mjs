import { google } from 'googleapis';
import fs from 'fs';

async function initializeSheets() {
  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync('/Users/jack/Downloads/realtor-roof-website-627513d0ce40.json', 'utf8'));
    const spreadsheetId = '11ADRGzCjs_ZLxN458H62s5CUV1CKBjt5zhjZvjv5vdk';

    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get existing sheets
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];

    console.log('Existing sheets:', existingSheets);

    // Define the three tabs we need
    const tabsToCreate = [
      { title: 'Partnership Inquiries', headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Agent Type', 'Brokerage', 'Message', 'Source', 'Priority'] },
      { title: 'Inspection Requests', headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Property Address', 'Message', 'Source', 'Priority'] },
      { title: 'General Contact', headers: ['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Source', 'Priority'] }
    ];

    // Create tabs that don't exist
    for (const tab of tabsToCreate) {
      if (!existingSheets.includes(tab.title)) {
        console.log(`Creating tab: ${tab.title}`);
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{
              addSheet: {
                properties: { title: tab.title }
              }
            }]
          }
        });

        // Add headers
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${tab.title}!A1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [tab.headers]
          }
        });

        console.log(`Added headers to ${tab.title}`);
      } else {
        console.log(`Tab already exists: ${tab.title}`);

        // Update headers if tab exists
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${tab.title}!A1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [tab.headers]
          }
        });
        console.log(`Updated headers for ${tab.title}`);
      }
    }

    console.log('✅ Google Sheets initialized successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.errors) {
      console.error('Details:', JSON.stringify(error.errors, null, 2));
    }
  }
}

initializeSheets();
