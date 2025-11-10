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
    const { name, email, phone, annualRoofVolume, message } = data;
    if (
      !name ||
      !email ||
      !phone ||
      annualRoofVolume === undefined ||
      annualRoofVolume === null ||
      annualRoofVolume === '' ||
      !message
    ) {
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

    const roofVolumeNumber = Number(annualRoofVolume);
    if (Number.isNaN(roofVolumeNumber) || roofVolumeNumber < 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid roof volume' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cleanedData = { ...data };
    delete cleanedData.honeypot;
    cleanedData.annualRoofVolume = roofVolumeNumber;

    const volumeTag =
      roofVolumeNumber >= 24 ? 'roof-volume-high' : roofVolumeNumber >= 12 ? 'roof-volume-mid' : 'roof-volume-low';

    const submission = {
      ...cleanedData,
      formKey: 'partnership',
      formType: 'Partnership Inquiry',
      annualRoofVolume: roofVolumeNumber,
      brokerage: data.brokerage || 'Not provided',
      submittedAt: new Date().toISOString(),
      source: data.source || 'realtor-partnership-site/partners',
      priority: 'HIGH',
      tags: ['realtor-partnership', volumeTag],
    };

    const delivery = await dispatchFormSubmission(submission);
    if (!delivery.success) {
      return new Response(
        JSON.stringify({ error: 'Unable to record partnership inquiry at this time.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!delivery.n8nDelivered && delivery.details.n8nError) {
      console.warn('Partnership submission delivered without n8n:', delivery.details.n8nError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Partnership inquiry submitted successfully. We look forward to working with you!',
        delivery: {
          n8n: delivery.n8nDelivered,
          sheets: delivery.sheetsDelivered,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Partnership inquiry form error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
