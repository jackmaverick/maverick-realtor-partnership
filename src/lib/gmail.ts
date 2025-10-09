import nodemailer from 'nodemailer';
import type { FormSubmission } from './email';

/**
 * Send auto-reply email to form submitter using Gmail
 */
export async function sendAutoReplyEmail(formData: FormSubmission): Promise<boolean> {
  try {
    // Check if Gmail credentials are configured
    const gmailUser = import.meta.env.GMAIL_USER;
    const gmailPassword = import.meta.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      console.warn('Gmail credentials not configured. Auto-reply skipped.');
      return false;
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword, // This should be an App Password, not regular password
      },
    });

    // Generate email content based on form type
    const emailContent = generateAutoReplyHTML(formData);

    // Send email
    await transporter.sendMail({
      from: `Realtor Roof <${gmailUser}>`,
      to: formData.email,
      subject: getSubjectLine(formData.formType),
      html: emailContent,
    });

    console.log('Auto-reply email sent to:', formData.email);
    return true;
  } catch (error) {
    console.error('Failed to send auto-reply email:', error);
    return false;
  }
}

/**
 * Get subject line based on form type
 */
function getSubjectLine(formType: string): string {
  switch (formType) {
    case 'Partnership Inquiry':
      return 'Thank You for Your Partnership Inquiry - Realtor Roof';
    case 'Property Inspection Request':
      return 'Your Property Inspection Request Received - Realtor Roof';
    default:
      return 'Thank You for Contacting Realtor Roof';
  }
}

/**
 * Generate HTML email content for auto-reply
 */
function generateAutoReplyHTML(formData: FormSubmission): string {
  const greeting = `Hi ${formData.name.split(' ')[0]},`;

  let mainMessage = '';

  switch (formData.formType) {
    case 'Partnership Inquiry':
      mainMessage = `
        <p>Thank you for your interest in partnering with Realtor Roof! We're excited to learn more about how we can support your real estate business.</p>
        <p>Our team specializes in helping buyer's and seller's agents provide exceptional roofing services to their clients, including:</p>
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li>Fast property inspections that meet transaction timelines</li>
          <li>Payment at closing options for buyers</li>
          <li>Pre-listing inspections and roof improvements for sellers</li>
          <li>3D design visualizations to help sellers choose the best roofing</li>
        </ul>
        <p><strong>We'll review your inquiry and reach out within 24 hours to discuss partnership opportunities.</strong></p>
      `;
      break;

    case 'Property Inspection Request':
      mainMessage = `
        <p>Thank you for requesting a property inspection through Realtor Roof!</p>
        <p>We understand that timing is critical in real estate transactions. Our inspection team is standing by to provide you with:</p>
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li>Fast, professional roof inspections</li>
          <li>Detailed reports for your clients</li>
          <li>Unbiased assessments partnering with Arrowhead Inspections</li>
          <li>Flexible scheduling to meet your closing timeline</li>
        </ul>
        <p><strong>We'll contact you within 24 hours to schedule the inspection.</strong></p>
      `;
      break;

    default:
      mainMessage = `
        <p>Thank you for reaching out to Realtor Roof! We've received your message and appreciate your interest.</p>
        <p>At Realtor Roof, we specialize in partnering with real estate professionals to provide exceptional roofing services for your clients. Whether you're working with buyers or sellers, we have solutions designed specifically for real estate transactions.</p>
        <p><strong>We'll respond to your inquiry within 24 hours.</strong></p>
      `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1e3a8a; color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Realtor Roof</h1>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Your Trusted Partner in Real Estate Roofing</p>
        </div>

        <div style="background-color: #f9fafb; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none;">
          ${greeting}

          ${mainMessage}

          <div style="margin-top: 30px; padding: 20px; background-color: #dbeafe; border-left: 4px solid #1e3a8a; border-radius: 4px;">
            <p style="margin: 0 0 15px 0; font-weight: 600; color: #1e3a8a;">Need immediate assistance?</p>
            <p style="margin: 0; font-size: 14px;">
              📞 Call us: <a href="tel:9132686052" style="color: #1e3a8a; text-decoration: none; font-weight: 600;">(913) 268-6052</a><br>
              ✉️ Email: <a href="mailto:jack@maverickexteriorskc.com" style="color: #1e3a8a; text-decoration: none;">jack@maverickexteriorskc.com</a>
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">
              <strong>About Realtor Roof</strong>
            </p>
            <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5;">
              Realtor Roof partners with Maverick Exteriors, Kansas City's trusted roofing contractor with 30+ years of experience.
              We specialize in helping real estate professionals provide exceptional roofing services to their clients,
              with fast turnaround times, flexible payment options, and expertise in handling real estate transaction timelines.
            </p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Realtor Roof | Powered by Maverick Exteriors</p>
          <p style="margin: 5px 0 0 0;">Kansas City, Kansas | (913) 268-6052</p>
        </div>
      </body>
    </html>
  `;
}
