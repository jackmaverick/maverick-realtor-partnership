import type { APIRoute } from 'astro';
import { createJobNimbusContact } from '../../lib/jobnimbus';

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
      formType: 'Property Inspection Request',
      name,
      email,
      phone,
      propertyAddress: data.propertyAddress || 'Not provided',
      message,
      submittedAt: new Date().toISOString(),
      source: 'Roof Kit Website',
      priority: 'HIGH', // Inspection requests are high priority
    };

    console.log('Inspection request form submission:', formData);

    // Create JobNimbus contact with HIGH priority and inspection tags
    const jobNimbusResult = await createJobNimbusContact(formData);

    if (!jobNimbusResult) {
      console.error('JobNimbus contact creation failed for inspection request');
      return new Response(
        JSON.stringify({ error: 'Unable to record inspection request at this time.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Inspection request submitted successfully. We will contact you within 24 hours.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Inspection request form error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
