import { sendToN8n } from './n8n';
import { appendToGoogleSheets } from './googlesheets';
import type { FormSubmission } from './formTypes';

export interface SubmissionDeliveryResult {
  n8nDelivered: boolean;
  sheetsDelivered: boolean;
  success: boolean;
  details: {
    n8nError?: string;
  };
}

/**
 * Fan out a form submission to every downstream integration.
 * We consider the submission successful as long as at least one integration accepts it.
 */
export async function dispatchFormSubmission(submission: FormSubmission & Record<string, unknown>): Promise<SubmissionDeliveryResult> {
  const [n8nResult, sheetsResult] = await Promise.all([sendToN8n(submission), appendToGoogleSheets(submission)]);

  const n8nDelivered = n8nResult.ok;
  const sheetsDelivered = sheetsResult;
  const success = n8nDelivered || sheetsDelivered;

  if (!success) {
    console.error('Form submission fan-out failed for', submission.formType, {
      n8nError: n8nResult.ok ? undefined : n8nResult.error,
      sheetsDelivered,
    });
  }

  return {
    n8nDelivered,
    sheetsDelivered,
    success,
    details: n8nResult.ok ? {} : { n8nError: n8nResult.error },
  };
}
