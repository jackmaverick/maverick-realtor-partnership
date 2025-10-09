# Integration Setup Guide

This guide explains how to set up the integrations for the Realtor Partnership Website.

## Overview

The website includes three main integrations:

1. **Email Notifications** - Instant email alerts to jack@maverickexteriorskc.com when forms are submitted
2. **JobNimbus CRM** - Automatic contact and job creation in JobNimbus
3. **Google Analytics 4** - Conversion tracking and user behavior analytics

---

## 1. Email Notifications (Resend)

### Setup Steps

1. **Create a Resend account** at [resend.com](https://resend.com)
2. **Add your domain** (optional but recommended for production)
   - Go to Domains → Add Domain
   - Add DNS records to verify your domain
   - This allows emails to come from `@maverickexteriorskc.com` instead of `@resend.dev`
3. **Get your API key**
   - Go to API Keys → Create API Key
   - Copy the API key
4. **Add to Vercel environment variables**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add: `RESEND_API_KEY` = `your_api_key_here`

### What Gets Emailed

All form submissions automatically send an email to **jack@maverickexteriorskc.com** with:
- Form type (Partnership, Inspection, or General Contact)
- All form field data in a formatted table
- Quick action links (click to call, click to email)
- Timestamp of submission

---

## 2. JobNimbus CRM Integration

### Setup Steps

1. **Get your JobNimbus API key**
   - Log into JobNimbus
   - Go to Settings → Integrations → API
   - Generate an API key

2. **Create the Realtor Partnership workflow** (if not already created)
   - Go to Settings → Workflows
   - Create a new workflow called "Realtor Partnership"
   - Note the workflow ID from the URL

3. **Add to Vercel environment variables**
   - `JOBNIMBUS_API_KEY` = `your_api_key_here`
   - `JOBNIMBUS_REALTOR_WORKFLOW_ID` = `your_workflow_id_here`

### How It Works

#### All Form Submissions
- **Creates a contact** in JobNimbus with:
  - Name (first and last parsed automatically)
  - Email address
  - Phone number
  - Contact Type: "Realtor/Real Estate Agent"
  - Tags: `realtor-website`, form type, agent type, priority
  - Source: "Realtor Partnership Website"

#### Inspection Requests with Address
When someone submits an inspection request AND provides a property address:
1. **Creates the contact** (as above)
2. **Creates a new job** under that contact with:
   - Job address = property address
   - Job name = "Inspection - [Name] - [Address]"
   - Linked to the contact
3. **Adds the job to the Realtor Partnership workflow**

#### Partnership Inquiries
- Creates the contact
- Creates a follow-up task (due in 24 hours)

### Testing the Integration

1. Submit a test form on the website
2. Check JobNimbus for the new contact
3. If it's an inspection with an address, verify the job was created

---

## 3. Google Analytics 4

### Setup Steps

1. **Create a GA4 property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create a new GA4 property
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add to Vercel environment variables**
   - `PUBLIC_GA4_ID` = `G-XXXXXXXXXX`
   - Note: This must start with `PUBLIC_` to be available in the browser

3. **Set up conversion goals** (optional but recommended)
   - Go to Admin → Events → Create Event
   - Create conversion events for:
     - `partnership_inquiry`
     - `inspection_request`
     - `form_submit`

### What Gets Tracked

#### Automatic Events
- Page views
- Form submissions (all types)
- CTA button clicks
- Phone number clicks (click-to-call)
- Email clicks

#### Custom Conversion Events
- `partnership_inquiry` - When someone submits the partnership form
- `inspection_request` - When someone requests an inspection
- `form_submit` - All form submissions (with form type parameter)

#### Event Parameters
All events include useful parameters like:
- `form_type` - Which form was submitted
- `agent_type` - Buyer's agent, seller's agent, or both
- `event_category` - engagement or conversion
- `value` - Numerical value for conversion tracking (partnership = 100, inspection = 75)

---

## Vercel Environment Variables Summary

Add these to your Vercel project:

```
PUBLIC_GA4_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
JOBNIMBUS_API_KEY=your_jobnimbus_api_key
JOBNIMBUS_REALTOR_WORKFLOW_ID=your_workflow_id
```

### How to Add Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click Settings
3. Click Environment Variables
4. Add each variable with its value
5. Select which environments (Production, Preview, Development)
6. Redeploy the site for changes to take effect

---

## Testing Checklist

After setting up all integrations, test the following:

- [ ] Submit general contact form → Receive email
- [ ] Submit partnership inquiry → Receive email + JobNimbus contact created
- [ ] Submit inspection request with address → Receive email + JobNimbus contact + job created
- [ ] Check GA4 Realtime report to see page views and events
- [ ] Click phone number → GA4 tracks phone_click event
- [ ] Submit any form → GA4 tracks form_submit event

---

## Troubleshooting

### Email notifications not working
- Check Resend dashboard for failed sends
- Verify `RESEND_API_KEY` is set in Vercel
- Check Vercel deployment logs for errors

### JobNimbus integration not working
- Verify API key has correct permissions
- Check Vercel deployment logs for API errors
- Test API key directly using Postman or curl

### GA4 not tracking
- Verify `PUBLIC_GA4_ID` starts with `PUBLIC_` prefix
- Open browser console, look for GA4 loading errors
- Use GA4 DebugView to see events in real-time
- Make sure ad blockers are disabled when testing

---

## Support

For integration issues:
- Email notifications: [Resend Documentation](https://resend.com/docs)
- JobNimbus API: [JobNimbus API Docs](https://documenter.getpostman.com/view/3919598/S1ETRGzt)
- Google Analytics: [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
