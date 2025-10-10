import type { APIRoute } from 'astro';
import { sendFormNotification } from '../../lib/email';
import { createJobNimbusContact } from '../../lib/jobnimbus';
import { appendToGoogleSheets } from '../../lib/googlesheets';
import { sendAutoReplyEmail } from '../../lib/gmail';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Honeypot check
    if (data.honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate required fields
    const { name, email, phone, message } = data;
    if (!name || !email || !phone || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare form data for submission
    const formData = {
      formType: 'General Contact',
      name,
      email,
      phone,
      subject: data.subject || 'General Inquiry',
      message,
      submittedAt: new Date().toISOString(),
      source: 'Realtor Roof Website',
    };

    console.log('General contact form submission:', formData);

    // Send email notification to team (non-blocking)
    sendFormNotification(formData).catch(err =>
      console.error('Email notification failed:', err)
    );

    // Send auto-reply to submitter (non-blocking)
    sendAutoReplyEmail(formData).catch(err =>
      console.error('Auto-reply email failed:', err)
    );

    // Save to Google Sheets (non-blocking)
    appendToGoogleSheets(formData).catch(err =>
      console.error('Google Sheets append failed:', err)
    );

    // Create JobNimbus contact (non-blocking)
    createJobNimbusContact(formData).catch(err =>
      console.error('JobNimbus integration failed:', err)
    );

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('General contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
