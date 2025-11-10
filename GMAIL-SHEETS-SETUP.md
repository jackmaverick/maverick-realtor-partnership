# Gmail & Google Sheets Setup Guide

This guide walks you through setting up Gmail auto-replies and Google Sheets database for the Roof Kit website.

---

## Gmail Auto-Reply Setup

When someone submits a form, they'll automatically receive a professional "thank you" email from your Gmail account.

### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. This is required to create App Passwords

### Step 2: Create Gmail App Password

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter: "Roof Kit Website"
5. Click **Generate**
6. **Copy the 16-character password** (you won't see it again!)

### Step 3: Add to Vercel Environment Variables

Add these two variables in Vercel:

```
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop  (16 characters, no spaces in actual password)
```

### What Gets Sent

Submitters receive a professional email with:
- Personalized greeting
- Thank you message specific to their inquiry type
- What to expect next (response within 24 hours)
- Your contact info for immediate needs
- Professional branding with Roof Kit + Maverick Exteriors

---

## Google Sheets Database Setup

All form submissions are automatically saved to a Google Sheet, giving you a permanent database you can access, search, and analyze.

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it: **Roof Kit - Form Submissions**
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit
   ```

### Step 2: Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google Sheets API**:
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create Service Account:
   - Go to **IAM & Admin** → **Service Accounts**
   - Click **Create Service Account**
   - Name: "Roof Kit Website"
   - Click **Create and Continue**
   - Skip granting access (click Continue)
   - Click **Done**

### Step 3: Generate Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Select **JSON** format
5. Click **Create**
6. A JSON file will download - **keep this secure!**

### Step 4: Share Sheet with Service Account

1. Open the downloaded JSON file
2. Find the `client_email` field (looks like: `realtor-roof@project-id.iam.gserviceaccount.com`)
3. Go back to your Google Sheet
4. Click **Share** button
5. Paste the service account email
6. Give it **Editor** access
7. Uncheck "Notify people"
8. Click **Share**

### Step 5: Add to Vercel Environment Variables

Add these two variables in Vercel:

```
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}

GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_from_step_1
```

**Note:** For `GOOGLE_SHEETS_CREDENTIALS`, paste the entire contents of the JSON file as a single line (minified).

### What Gets Saved

Every form submission creates a new row with:
- Timestamp
- Form Type (Partnership, Inspection, General)
- Name
- Email
- Phone
- Agent Type (if applicable)
- Brokerage (if provided)
- Property Address (if provided)
- Subject (if provided)
- Message
- Source (Roof Kit Website)
- Priority (HIGH or NORMAL)

The sheet will automatically create headers on first use.

---

## Testing

### Test Gmail Auto-Reply

1. Submit a test form on the website
2. Check the email address you used
3. You should receive a professional "Thank You" email within seconds
4. Verify it came from your Gmail account

### Test Google Sheets

1. Submit a test form on the website
2. Check your Google Sheet
3. A new row should appear with all form data
4. Verify all fields are populated correctly

---

## Troubleshooting

### Gmail: "Authentication failed"

- Verify you're using an **App Password**, not your regular Gmail password
- Make sure 2-Factor Authentication is enabled
- Regenerate the App Password if needed
- Check that `GMAIL_USER` matches the account that created the App Password

### Google Sheets: "Credentials not found"

- Verify the JSON is properly formatted (no line breaks)
- Make sure the service account email has Editor access to the sheet
- Check that Google Sheets API is enabled in your project
- Verify the Spreadsheet ID is correct

### Nothing is saving/sending

- Check Vercel deployment logs for errors
- Verify all environment variables are set
- Make sure variables are set for **Production** environment
- Redeploy the site after adding environment variables

---

## Data Flow

When a form is submitted:

1. **Validation** - Server validates all required fields
2. **Team Notification** - n8n workflow sends Slack/Email/OpenPhone alerts
3. **Auto-Reply** - Gmail sends thank you email to submitter (optional)
4. **Google Sheets** - Row added to spreadsheet
5. **JobNimbus** - Contact (and job if inspection with address) created
6. **Analytics** - GA4 tracks conversion event

All of these happen in parallel (non-blocking) so the user gets an instant response.

---

## Security Notes

- **Never commit** the service account JSON file to git
- Keep your Gmail App Password secure
- Service account email has no other access to your Google account
- You can revoke access anytime by removing the service account from the sheet
- Environment variables in Vercel are encrypted

---

## Accessing Your Data

### Google Sheets
- Access anytime at [sheets.google.com](https://sheets.google.com)
- Use filters, sorting, pivot tables
- Export to Excel/CSV
- Share with team members

### Gmail Sent Folder
- All auto-replies appear in your Gmail Sent folder
- Search by subject line to find specific responses
- See what customers received

---

## Need Help?

If you run into issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set correctly
3. Test API access manually using [Google OAuth Playground](https://developers.google.com/oauthplayground/)
4. Contact support with error messages from logs
