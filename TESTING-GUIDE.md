# Testing Guide - Realtor Roof Website

## Quick Test Checklist

### ✅ Form Submission Test

1. **Go to the contact page** on the live site
2. **Submit a test form** (use a real email you can check)
3. **Verify you receive 4 things:**
   - ✉️ Auto-reply email in your inbox (from your Gmail)
   - ✉️ Team notification email to jack@maverickexteriorskc.com
   - 📊 New row in Google Sheets
   - 🔧 New contact in JobNimbus

### Form Types to Test

- **Partnership Inquiry** - Requires: Name, Email, Phone, Agent Type, Message
- **Request Inspection** - Requires: Name, Email, Phone, Property Address, Message
- **General Inquiry** - Requires: Name, Email, Phone, Message

---

## Detailed Testing Steps

### 1. Test Partnership Form

**Expected Results:**
- ✅ Auto-reply email with partnership-specific message
- ✅ Team notification to jack@maverickexteriorskc.com
- ✅ Google Sheets row with all data including Agent Type and Brokerage
- ✅ JobNimbus contact with "Realtor/Real Estate Agent" type
- ✅ JobNimbus follow-up task created (due in 24 hours)
- ✅ GA4 tracks `partnership_inquiry` conversion event

### 2. Test Inspection Form WITH Address

**Expected Results:**
- ✅ Auto-reply email with inspection-specific message
- ✅ Team notification to jack@maverickexteriorskc.com
- ✅ Google Sheets row with property address
- ✅ JobNimbus contact created
- ✅ **JobNimbus JOB created** at the property address
- ✅ Job added to realtor partnership workflow
- ✅ GA4 tracks `inspection_request` conversion event

### 3. Test Inspection Form WITHOUT Address

**Expected Results:**
- ✅ Auto-reply email
- ✅ Team notification
- ✅ Google Sheets row
- ✅ JobNimbus contact created
- ⚠️ **NO job created** (because no address provided)
- ✅ GA4 tracks event

### 4. Test General Contact Form

**Expected Results:**
- ✅ Auto-reply email with general message
- ✅ Team notification to jack@maverickexteriorskc.com
- ✅ Google Sheets row
- ✅ JobNimbus contact
- ✅ GA4 tracks `form_submit` event

---

## What to Check

### Auto-Reply Email

Check the submitter's inbox for:
- **From:** Your Gmail address (e.g., jack@gmail.com or whatever GMAIL_USER is set to)
- **Subject:** Varies by form type:
  - Partnership: "Thank You for Your Partnership Inquiry - Realtor Roof"
  - Inspection: "Your Property Inspection Request Received - Realtor Roof"
  - General: "Thank You for Contacting Realtor Roof"
- **Content:** Professional HTML email with:
  - Personalized greeting (uses first name)
  - Form-specific message
  - Contact info: (913) 268-6052
  - "Powered by Maverick Exteriors" branding

### Team Notification Email

Check jack@maverickexteriorskc.com inbox for:
- **From:** Realtor Partnership Website <onboarding@resend.dev>
- **Subject:** "New [Form Type] - [Name]"
- **Content:** All form data in formatted table
- **Reply-To:** Set to submitter's email

### Google Sheets

Check your spreadsheet for new row with:
- Column A: Timestamp
- Column B: Form Type
- Column C: Name
- Column D: Email
- Column E: Phone
- Column F: Agent Type (if partnership form)
- Column G: Brokerage (if provided)
- Column H: Property Address (if inspection form)
- Column I: Subject (if general form)
- Column J: Message
- Column K: Source ("Realtor Roof Website")
- Column L: Priority ("HIGH" or "NORMAL")

### JobNimbus

Check JobNimbus for:
- **New Contact:**
  - Name split into first/last
  - Email and phone populated
  - Contact Type: "Realtor/Real Estate Agent"
  - Tags: `realtor-website`, form type, agent type, priority
  - Source: "Realtor Roof Website"
  - Description: Message from form

- **New Job (Inspection with Address only):**
  - Job Name: "Inspection - [Name] - [Address]"
  - Address: Property address from form
  - Related to contact
  - In realtor partnership workflow

- **Follow-up Task (Partnership only):**
  - Due: 24 hours from submission
  - Linked to contact

### Google Analytics

Check GA4 Realtime report for:
- Page view event
- Form submit event
- Conversion event (partnership_inquiry or inspection_request)
- Event parameters: form_type, agent_type, value

---

## Troubleshooting

### No Auto-Reply Email

1. Check spam folder
2. Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` in Vercel
3. Check Vercel deployment logs for Gmail errors
4. Verify 2FA is enabled on Gmail account
5. Regenerate App Password if needed

### No Google Sheets Row

1. Verify service account has Editor access to sheet
2. Check `GOOGLE_SHEETS_SPREADSHEET_ID` is correct
3. Check `GOOGLE_SHEETS_CREDENTIALS` JSON is valid
4. Verify Google Sheets API is enabled
5. Check Vercel logs for Sheets errors

### No JobNimbus Contact

1. Verify `JOBNIMBUS_API_KEY` in Vercel
2. Check API key permissions
3. Check Vercel logs for JobNimbus errors
4. Test API key directly with Postman

### No Team Notification

1. Check `RESEND_API_KEY` in Vercel
2. Verify domain is configured in Resend
3. Check spam folder
4. Check Vercel logs for Resend errors

---

## Environment Variables Quick Reference

All of these must be set in Vercel:

```
PUBLIC_GA4_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
JOBNIMBUS_API_KEY=your_api_key
JOBNIMBUS_REALTOR_WORKFLOW_ID=your_workflow_id
```

**Note:** After adding/changing environment variables, you MUST redeploy the site.

---

## Success Criteria

A fully working system should:

- ✅ Accept form submissions without errors
- ✅ Send 2 emails (auto-reply + team notification)
- ✅ Create Google Sheets row
- ✅ Create JobNimbus contact (and job if inspection with address)
- ✅ Track GA4 conversion events
- ✅ All within 1-2 seconds of form submission

**User sees:** "Thank you! We'll be in touch shortly." message

**Behind the scenes:** 5 things happen in parallel (non-blocking)

---

## Test Data Examples

### Good Test Data

**Partnership Form:**
```
Name: John Smith
Email: john.test@gmail.com
Phone: (913) 555-1234
Agent Type: Buyer's Agent
Brokerage: Realty Kansas City
Message: I'd like to learn about your partnership program
```

**Inspection Form:**
```
Name: Jane Doe
Email: jane.test@gmail.com
Phone: (913) 555-5678
Property Address: 123 Main St, Leawood, KS 66209
Message: Need inspection for buyer closing next week
```

### What NOT to Test

- ❌ Fake emails (you won't see auto-reply)
- ❌ Incomplete forms (required fields will error)
- ❌ Filling honeypot field (will be silently rejected)

---

## Next Steps After Testing

Once all tests pass:
1. ✅ Share the live URL with your team
2. ✅ Monitor Google Sheets for real submissions
3. ✅ Check JobNimbus regularly for new leads
4. ✅ Review GA4 to see conversion rates
5. ✅ Adjust auto-reply email content if needed

---

## Support

If something isn't working:
1. Check Vercel deployment logs first
2. Verify all environment variables are set
3. Make sure you redeployed after adding variables
4. Test each integration separately
5. Review setup guides in INTEGRATION-SETUP.md and GMAIL-SHEETS-SETUP.md
