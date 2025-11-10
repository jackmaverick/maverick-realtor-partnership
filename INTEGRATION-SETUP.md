# Integration Setup Guide

This guide explains how to set up the integrations for the Realtor Partnership Website.

## Overview

The website includes two primary integrations:

1. **Automation via n8n** - Central webhook that fans out to JobNimbus, OpenPhone, Google Sheets, Slack, etc.
2. **Google Analytics 4** - Conversion tracking and user behavior analytics

> Need Gmail auto-replies or a Google Sheets archive? See `GMAIL-SHEETS-SETUP.md` for optional add-ons.

---

## 1. Automation via n8n (JobNimbus/OpenPhone/etc.)

### Setup Steps

1. **Open your n8n workflow**
   - Identify the webhook node that should receive website leads
   - Copy the production webhook URL into `.env.local` (`N8N_WEBHOOK_URL=...`) and Vercel

2. **Map Payload Fields**
   - `name`, `firstName`, `lastName`
   - `email`, `phone`
   - `agentType`, `brokerage`, `message`
   - `address`, `city`, `state`, `postalCode`, `addressSource`
   - `formKey` / `formType` (`general`, `inspection`, `partnership`)
   - `priority`, `submittedAt`, `source`, plus any hidden fields you pass in the component

3. **Branch for Downstream Systems**
   - Example: `Switch` on `formKey` to decide which JobNimbus workflow, OpenPhone number, or database table to hit
   - Add nodes to:
     - Create/Update JobNimbus contacts or jobs
     - Send OpenPhone SMS/voice notifications
     - Append to Google Sheets or Airtable
     - Trigger Slack/Teams alerts or email sequences

4. **Tagging / Metadata**
   - Use `formKey`, `priority`, and `source` to set tags like `"website-partnership"`, `"high-priority"`, etc.
   - Add `priority: HIGH` when `formKey === 'inspection'` (already set by the API route)

### Testing the Integration

1. Submit a test form on the website (local or staging)
2. In n8n, open **Executions** and inspect the payload
3. Confirm downstream nodes ran (JobNimbus contact, OpenPhone message, Sheets row, etc.)
4. Re-run the execution as needed while tweaking your workflow—no code changes required

---

## 2. Google Analytics 4

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
N8N_WEBHOOK_URL=https://your-workflow-url
GOOGLE_PLACES_API_KEY=your_google_places_api_key
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_CLARITY_ID=clarity-project-id
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

- [ ] Submit general contact form → n8n execution shows `formKey: general`
- [ ] Submit partnership inquiry → n8n tags `agent-type-*` and `priority: HIGH`
- [ ] Submit inspection request with address → n8n payload shows structured address + `priority: HIGH`
- [ ] Check GA4 Realtime report to see page views and events
- [ ] Click phone number → GA4 tracks phone_click event
- [ ] Submit any form → GA4 tracks form_submit event

---

## Troubleshooting

### n8n automation not working
- Verify `N8N_WEBHOOK_URL` is set (local + Vercel)
- Check Vercel deployment logs for `/api/general|inspection|partnership`
- Review n8n → Executions for failures (re-run with edits if needed)

### GA4 not tracking
- Verify `PUBLIC_GA4_ID` starts with `PUBLIC_` prefix
- Open browser console, look for GA4 loading errors
- Use GA4 DebugView to see events in real-time
- Make sure ad blockers are disabled when testing

---

## Support

For integration issues:
- Automation workflows: [n8n Documentation](https://docs.n8n.io)
- Google Analytics: [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
