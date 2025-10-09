import type { APIRoute } from 'astro';
import { sendFormNotification } from '../../lib/email';
import { createJobNimbusContact } from '../../lib/jobnimbus';

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
    const { name, email, phone, agentType, message } = data;
    if (!name || !email || !phone || !agentType || !message) {
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

    // Validate agent type
    const validAgentTypes = ['buyers', 'sellers', 'both'];
    if (!validAgentTypes.includes(agentType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid agent type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare form data for submission
    const formData = {
      formType: 'Partnership Inquiry',
      name,
      email,
      phone,
      agentType: agentType === 'buyers' ? "Buyer's Agent" : agentType === 'sellers' ? "Seller's Agent" : 'Both',
      brokerage: data.brokerage || 'Not provided',
      message,
      submittedAt: new Date().toISOString(),
      source: 'Realtor Partnership Website',
      priority: 'HIGH', // Partnership inquiries are high priority
      tags: ['realtor-partnership', `agent-type-${agentType}`],
    };

    console.log('Partnership inquiry form submission:', formData);

    // Send email notification (non-blocking)
    sendFormNotification(formData).catch(err =>
      console.error('Email notification failed:', err)
    );

    // Create JobNimbus contact with partnership tags (non-blocking)
    createJobNimbusContact(formData).catch(err =>
      console.error('JobNimbus integration failed:', err)
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Partnership inquiry submitted successfully. We look forward to working with you!'
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
