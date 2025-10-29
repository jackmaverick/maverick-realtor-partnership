# Testing Guide - Roof Kit Website

## Quick Test Checklist

1. **Open `/contact`** on the live site (or local dev with `.env.local`).
2. **Submit each form** (Partnership, Inspection, General) using your own info.
3. **Confirm JobNimbus activity**:
   - New contact with tags (`realtor-website`, form type, agent type, priority).
   - Inspection jobs added to the Realtor workflow (if `JOBNIMBUS_REALTOR_WORKFLOW_ID` is set).
   - Follow-up tasks created (use JobNimbus automations to send emails + notifications).

## Detailed Testing Steps

### 1. Partnership Form

**Expected Results**
- JobNimbus contact created with realtor tags.
- Follow-up task created (assigned if `JOBNIMBUS_TASK_ASSIGNEE_ID` configured).
- GA4 logs `partnership_inquiry` event.
- (Automation) Configure JobNimbus to email the submitter and notify your team when this task/contact is created.

### 2. Inspection Form (with address)

**Expected Results**
- JobNimbus contact created with inspection tags.
- JobNimbus job created with the submitted address.
- Job automatically placed in the Realtor workflow when `JOBNIMBUS_REALTOR_WORKFLOW_ID` is provided.
- Follow-up task created (automation trigger).
- GA4 logs `inspection_request` event.

### 3. Inspection Form (without address)

**Expected Results**
- JobNimbus contact created.
- No job is created (no address), but a follow-up task is still generated.
- GA4 logs `inspection_request` event.

### 4. General Contact Form

**Expected Results**
- JobNimbus contact created with general inquiry tags.
- Follow-up task created.
- GA4 logs `form_submit` event.

## What to Check in JobNimbus

- **Contact record**
  - First/last name split, email, and phone populated.
  - Contact type set to “Realtor/Real Estate Agent”.
  - Tags include `realtor-website`, form type, agent type, and priority.
  - Description contains the message from the form.

- **Jobs (inspection forms with address)**
  - Job name `Inspection - [Name] - [Address]`.
  - Related to the new contact.
  - Workflow set to the realtor pipeline if `JOBNIMBUS_REALTOR_WORKFLOW_ID` is configured.

- **Tasks (all forms)**
  - Title `Follow up: [Form Type] - [Name]`.
  - Due tomorrow.
  - Assigned to `JOBNIMBUS_TASK_ASSIGNEE_ID` if provided.
  - Use these tasks as automation triggers for outbound email and internal notifications.

## Google Analytics

Use GA4 → Realtime to confirm:
- `page_view` and `form_submit` events.
- Conversion events (`partnership_inquiry`, `inspection_request`).
- Event parameters include `form_type`, `agent_type`, and `value`.

## Troubleshooting

### No JobNimbus Contact
1. Verify `JOBNIMBUS_API_KEY` is set (Vercel → Settings → Environment Variables).
2. Check API token permissions (should allow contacts, jobs, tasks).
3. Inspect Vercel function logs for the API route for error details.

### No Job Created (Inspection)
1. Ensure the form submission included a property address.
2. Confirm the JobNimbus API key has permission to create jobs.
3. Verify `JOBNIMBUS_REALTOR_WORKFLOW_ID` (optional) is correct.

### No Follow-Up Task or Assignment
1. Confirm `JOBNIMBUS_TASK_ASSIGNEE_ID` is set (optional).
2. Review the API route logs to ensure the task call succeeded.
3. If using automations, double-check the trigger conditions in JobNimbus.

### GA4 Events Missing
1. Confirm `PUBLIC_GA4_ID` is set.
2. Check browser console for blocked scripts or consent mode issues.
3. Use GA4 DebugView to verify events on the device you’re testing with.

## Environment Variables Quick Reference

Set these in Vercel (and `.env.local` for local testing):

```
PUBLIC_GA4_ID=G-XXXXXXXXXX
JOBNIMBUS_API_KEY=your_api_token
JOBNIMBUS_REALTOR_WORKFLOW_ID=optional_workflow_id
JOBNIMBUS_TASK_ASSIGNEE_ID=optional_user_id
```

After updating environment variables, redeploy the site so the serverless functions receive the new values.

## Success Criteria

- ✅ Form submission completes with success message.
- ✅ JobNimbus contact (and job if inspection with address) is created instantly.
- ✅ Follow-up task exists to trigger automations.
- ✅ GA4 captures the submission event.
- ✅ All actions complete within ~2 seconds of submission.
