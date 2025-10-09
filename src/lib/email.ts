import { Resend } from 'resend';

// Initialize Resend with API key or placeholder (required for build)
const resend = new Resend(import.meta.env.RESEND_API_KEY || 'placeholder_key');

export interface FormSubmission {
  formType: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  [key: string]: any;
}

export async function sendFormNotification(formData: FormSubmission): Promise<boolean> {
  try {
    // Check if Resend API key is configured
    if (!import.meta.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email notification skipped.');
      return false;
    }

    const { data, error } = await resend.emails.send({
      from: 'Realtor Partnership Website <onboarding@resend.dev>', // Update with verified domain
      to: 'jack@maverickexteriorskc.com',
      subject: `New ${formData.formType} - ${formData.name}`,
      html: generateEmailHTML(formData),
      replyTo: formData.email,
    });

    if (error) {
      console.error('Resend email error:', error);
      return false;
    }

    console.log('Email notification sent to jack@maverickexteriorskc.com:', data);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}

function generateEmailHTML(formData: FormSubmission): string {
  const fields = Object.entries(formData)
    .filter(([key]) => !['submittedAt'].includes(key))
    .map(([key, value]) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; text-transform: capitalize;">
          ${key.replace(/([A-Z])/g, ' $1').trim()}:
        </td>
        <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">
          ${value}
        </td>
      </tr>
    `)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New ${formData.formType}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1e3a8a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">New ${formData.formType}</h1>
        </div>

        <div style="background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="margin-top: 0; font-size: 14px; color: #6b7280;">
            Submitted: ${new Date(formData.submittedAt).toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'short',
            })}
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; border-radius: 8px; overflow: hidden;">
            ${fields}
          </table>

          <div style="margin-top: 30px; padding: 15px; background-color: #dbeafe; border-left: 4px solid #1e3a8a; border-radius: 4px;">
            <p style="margin: 0; font-size: 14px;">
              <strong>Quick Actions:</strong><br>
              📞 Call: <a href="tel:${formData.phone}" style="color: #1e3a8a; text-decoration: none;">${formData.phone}</a><br>
              ✉️ Email: <a href="mailto:${formData.email}" style="color: #1e3a8a; text-decoration: none;">${formData.email}</a>
            </p>
          </div>
        </div>

        <div style="margin-top: 20px; padding: 15px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>This notification was sent from the Realtor Partnership Website</p>
          <p style="margin: 5px 0;">Maverick Exteriors | (913) 268-6052</p>
        </div>
      </body>
    </html>
  `;
}
