# Testing Guide - Roof Kit Website

## Quick Test Checklist

1. **Open `/contact`** on the live site (or local dev with `.env.local`).
2. **Submit each form** (Partnership, Inspection, General) using your own info.
3. **Confirm n8n automation**:
   - Execution payload shows `formKey`, priority, and metadata.
   - Downstream nodes (JobNimbus, OpenPhone, Sheets, etc.) succeed.
   - Tags/hidden fields pass through for routing.

## Detailed Testing Steps

### 1. Partnership Form

**Expected Results**
- n8n execution logs `formKey: partnership`, `priority: HIGH`, `tags: ['realtor-partnership', ...]`.
- Downstream nodes fire (JobNimbus contact/task, OpenPhone alert, Sheet row, etc. depending on your workflow).
- GA4 logs `partnership_inquiry` + `form_submit` events.
- Automated follow-ups (JobNimbus, email, SMS) trigger inside n8n if you configured them.

### 2. Inspection Form (with address)

**Expected Results**
- n8n execution shows `formKey: inspection`, `priority: HIGH`, and structured address metadata (street/city/state/ZIP).
- Downstream nodes create/update JobNimbus, Sheets, SMS, etc. (per your workflow).
- GA4 logs `inspection_request` + `form_submit` events.

### 3. Inspection Form (without address)

**Expected Results**
- n8n execution shows `formKey: inspection` and `propertyAddress: "Not provided"`.
- Downstream nodes still run (task creation, notifications).
- GA4 logs `inspection_request` + `form_submit` events.

### 4. General Contact Form

**Expected Results**
- n8n execution shows `formKey: general`, `subject`, and any hidden fields you passed.
- Downstream automations run (JobNimbus contact, email, etc.).
- GA4 logs `form_submit` event.

## Optional: What to Check in JobNimbus

If your n8n workflow pushes data into JobNimbus, verify:

- **Contact record**
  - First/last name split, email, and phone populated.
  - Contact type set to “Realtor/Real Estate Agent”.
  - Tags include `realtor-website`, form type, agent type, and priority.
  - Description contains the message from the form.

- **Jobs (inspection forms with address)**
  - Job name `Inspection - [Name] - [Address]`.
  - Related to the new contact.
  - Workflow set to the realtor pipeline if your automation assigns it.

- **Tasks (all forms)**
  - Title `Follow up: [Form Type] - [Name]`.
  - Due tomorrow/next business day.
  - Assigned to the correct owner (based on your n8n node).
  - Use these tasks as automation triggers for outbound email and internal notifications.

## Google Analytics

Use GA4 → Realtime to confirm:
- `page_view` and `form_submit` events.
- Conversion events (`partnership_inquiry`, `inspection_request`).
- Event parameters include `form_type`, `agent_type`, and `value`.

## Troubleshooting

### No n8n Execution
1. Verify `N8N_WEBHOOK_URL` is set locally and in Vercel.
2. Check Vercel function logs for `/api/{general|inspection|partnership}`.
3. Open n8n → Executions and confirm the webhook node received the payload.

### JobNimbus Node Failed (inside n8n)
1. Inspect the failed node log for the HTTP status + message.
2. Confirm your JobNimbus credentials/workflow IDs inside n8n are valid.
3. Re-run the execution after fixing credentials to avoid re-submitting the form.

### Follow-Up Actions Didn’t Trigger
1. Confirm the downstream node (task creation, SMS, email) executed successfully.
2. Check any filters/IF nodes that may be skipping the payload (e.g., missing agentType).
3. Add logging nodes in n8n to capture payload state before/after each branch.

### GA4 Events Missing
1. Confirm `PUBLIC_GA4_ID` is set.
2. Check browser console for blocked scripts or consent mode issues.
3. Use GA4 DebugView to verify events on the device you’re testing with.

## Environment Variables Quick Reference

Set these in Vercel (and `.env.local` for local testing):

```
N8N_WEBHOOK_URL=https://your-workflow-url
GOOGLE_PLACES_API_KEY=your_google_places_api_key
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_CLARITY_ID=clarity-project-id
```

After updating environment variables, redeploy the site so the serverless functions receive the new values.

## Success Criteria

- ✅ Form submission completes with success message.
- ✅ n8n execution completes with success across all nodes (JobNimbus/Sheets/SMS/etc.).
- ✅ Downstream follow-ups exist (tasks, jobs, notifications) per your automation.
- ✅ GA4 captures the submission event.
- ✅ All actions complete within ~2 seconds of submission.
