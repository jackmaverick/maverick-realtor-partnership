import type { APIRoute } from 'astro';
import { dispatchFormSubmission } from '../../lib/formSubmission';

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

    const cleanedData = { ...data };
    delete cleanedData.honeypot;

    const submission = {
      ...cleanedData,
      formKey: 'inspection',
      formType: 'Property Inspection Request',
      propertyAddress: data.propertyAddress || 'Not provided',
      submittedAt: new Date().toISOString(),
      source: data.source || 'realtor-partnership-site/inspection',
      priority: 'HIGH',
    };

    const delivery = await dispatchFormSubmission(submission);
    if (!delivery.success) {
      return new Response(
        JSON.stringify({ error: 'Unable to record inspection request at this time.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!delivery.n8nDelivered && delivery.details.n8nError) {
      console.warn('Inspection request delivered without n8n:', delivery.details.n8nError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Inspection request submitted successfully. We will contact you within 24 hours.',
        delivery: {
          n8n: delivery.n8nDelivered,
          sheets: delivery.sheetsDelivered,
        },
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
