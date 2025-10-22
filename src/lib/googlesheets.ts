import { google } from 'googleapis';
import type { FormSubmission } from './email';

/**
 * Append form submission data to Google Sheets
 * This creates a permanent record of all form submissions
 */
export async function appendToGoogleSheets(formData: FormSubmission): Promise<boolean> {
  try {
    // Check if Google Sheets credentials are configured
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS || import.meta.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    console.log('Google Sheets - Checking credentials...');
    console.log('Has credentials:', !!credentials);
    console.log('Has spreadsheetId:', !!spreadsheetId);

    if (!credentials || !spreadsheetId) {
      console.warn('Google Sheets credentials not configured. Skipping sheets integration.');
      return false;
    }

    // Parse credentials from environment variable
    const credentialsJson = JSON.parse(credentials);

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: credentialsJson,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Determine which tab to use based on form type
    let sheetName: string;
    let rowData: any[];

    switch (formData.formType) {
      case 'Partnership Inquiry':
        sheetName = 'Partnership Inquiries';
        rowData = [
          formData.submittedAt,
          formData.name,
          formData.email,
          formData.phone,
          formData.agentType || '',
          formData.brokerage || '',
          formData.message,
          formData.source || 'Roof Kit Website',
          formData.priority || 'NORMAL',
        ];
        break;

      case 'Property Inspection Request':
        sheetName = 'Inspection Requests';
        rowData = [
          formData.submittedAt,
          formData.name,
          formData.email,
          formData.phone,
          formData.propertyAddress || '',
          formData.message,
          formData.source || 'Roof Kit Website',
          formData.priority || 'NORMAL',
        ];
        break;

      case 'General Contact':
      default:
        sheetName = 'General Contact';
        rowData = [
          formData.submittedAt,
          formData.name,
          formData.email,
          formData.phone,
          formData.subject || '',
          formData.message,
          formData.source || 'Roof Kit Website',
          formData.priority || 'NORMAL',
        ];
        break;
    }

    // Append to the appropriate sheet tab
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log(`Form submission appended to Google Sheets tab: ${sheetName}`);
    return true;
  } catch (error) {
    console.error('Failed to append to Google Sheets:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return false;
  }
}

/**
 * Initialize the Google Sheets with headers if it's a new sheet
 * This should be run once to set up the spreadsheet
 */
export async function initializeGoogleSheets(): Promise<boolean> {
  try {
    const credentials = process.env.GOOGLE_SHEETS_CREDENTIALS || import.meta.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || import.meta.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!credentials || !spreadsheetId) {
      console.warn('Google Sheets credentials not configured.');
      return false;
    }

    const credentialsJson = JSON.parse(credentials);
    const auth = new google.auth.GoogleAuth({
      credentials: credentialsJson,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Check if sheet exists
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === 'Form Submissions'
    );

    if (!sheetExists) {
      // Create the sheet with headers
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Form Submissions',
                },
              },
            },
          ],
        },
      });

      // Add headers
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Form Submissions!A1:L1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              'Timestamp',
              'Form Type',
              'Name',
              'Email',
              'Phone',
              'Agent Type',
              'Brokerage',
              'Property Address',
              'Subject',
              'Message',
              'Source',
              'Priority',
            ],
          ],
        },
      });

      console.log('Google Sheets initialized with headers');
    }

    return true;
  } catch (error) {
    console.error('Failed to initialize Google Sheets:', error);
    return false;
  }
}
