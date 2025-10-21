import type { FormSubmission } from './email';

export interface JobNimbusContact {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  tags?: string[];
  description?: string;
  source_name?: string;
  display_name?: string;
  contact_type?: string;
  [key: string]: any;
}

export interface JobNimbusJob {
  display_name: string;
  address_line1?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  contact_id?: string;
  related?: string[];
  description?: string;
  workflow?: string;
  [key: string]: any;
}

/**
 * Create a contact in JobNimbus CRM
 * API Documentation: https://documenter.getpostman.com/view/3919598/S1ETRGzt#contacts
 */
export async function createJobNimbusContact(formData: FormSubmission): Promise<boolean> {
  try {
    // Check if JobNimbus API credentials are configured
    const apiKey =
      process.env.JOBNIMBUS_API_KEY || (typeof import.meta !== 'undefined' ? import.meta.env.JOBNIMBUS_API_KEY : undefined);
    const workflowId =
      process.env.JOBNIMBUS_REALTOR_WORKFLOW_ID ||
      (typeof import.meta !== 'undefined' ? import.meta.env.JOBNIMBUS_REALTOR_WORKFLOW_ID : undefined);
    const taskAssigneeId =
      process.env.JOBNIMBUS_TASK_ASSIGNEE_ID ||
      (typeof import.meta !== 'undefined' ? import.meta.env.JOBNIMBUS_TASK_ASSIGNEE_ID : undefined);

    if (!apiKey) {
      console.warn('JobNimbus API key not configured. CRM integration skipped.');
      return false;
    }

    // Parse name into first and last
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Build tags based on form type and data
    const tags = [
      'realtor-website',
      formData.formType.toLowerCase().replace(/\s+/g, '-'),
    ];

    // Add agent type tags if available
    if (formData.agentType) {
      tags.push(`agent-${formData.agentType.toLowerCase().replace(/['s\s]+/g, '-')}`);
    }

    // Add priority tag for urgent requests
    if (formData.priority === 'HIGH') {
      tags.push('high-priority');
    }

    // Prepare contact data for JobNimbus
    const contactData: JobNimbusContact = {
      first_name: firstName,
      last_name: lastName,
      display_name: formData.name,
      email: formData.email,
      phone: formData.phone,
      contact_type: 'Realtor/Real Estate Agent',
      tags: tags,
      source_name: 'Realtor Partnership Website',
      description: formData.message,
    };

    if (formData.source) {
      contactData.source_name = formData.source;
    }

    // Add additional fields based on form type
    if (formData.brokerage) {
      contactData.company = formData.brokerage;
    }

    // Make API request to JobNimbus to create contact
    const response = await fetch('https://app.jobnimbus.com/api1/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('JobNimbus API error:', response.status, errorText);
      return false;
    }

    const contact = await response.json();
    console.log('JobNimbus contact created:', contact.jnid);

    // If this is an inspection request with an address, create a job
    if (formData.formType === 'Property Inspection Request' && formData.propertyAddress) {
      await createJobNimbusJob(contact.jnid, formData, workflowId);
    }

    // If this is a partnership inquiry, create a task for follow-up
    if (formData.formType === 'Partnership Inquiry') {
      await createJobNimbusTask(contact.jnid, formData, taskAssigneeId);
    }

    // Create a follow-up task for inspection/general as well (optional automation trigger)
    if (formData.formType !== 'Partnership Inquiry') {
      await createJobNimbusTask(contact.jnid, formData, taskAssigneeId);
    }

    return true;
  } catch (error) {
    console.error('Failed to create JobNimbus contact:', error);
    return false;
  }
}

/**
 * Create a job in JobNimbus for inspection requests
 */
async function createJobNimbusJob(contactId: string, formData: FormSubmission, workflowId?: string): Promise<void> {
  try {
    const apiKey =
      process.env.JOBNIMBUS_API_KEY || (typeof import.meta !== 'undefined' ? import.meta.env.JOBNIMBUS_API_KEY : undefined);

    if (!apiKey) {
      console.warn('JobNimbus API key not configured. Job creation skipped.');
      return;
    }
    // Parse address if provided
    const address = formData.propertyAddress || '';

    const jobData: JobNimbusJob = {
      display_name: `Inspection - ${formData.name} - ${address}`,
      address_line1: address,
      contact_id: contactId,
      related: [contactId],
      description: `Property Inspection Request\n\nRequested by: ${formData.name}\nMessage: ${formData.message}`,
    };

    if (workflowId) {
      jobData.workflow = workflowId;
    }

    const response = await fetch('https://app.jobnimbus.com/api1/jobs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('JobNimbus job creation error:', response.status, errorText);
      return;
    }

    const job = await response.json();
    console.log('JobNimbus job created:', job.jnid);

    // Add job to realtor partnership workflow
    await addJobToWorkflow(job.jnid);
  } catch (error) {
    console.error('Failed to create JobNimbus job:', error);
  }
}

/**
 * Add a job to the realtor partnership workflow
 */
async function addJobToWorkflow(jobId: string): Promise<void> {
  try {
    const apiKey =
      process.env.JOBNIMBUS_API_KEY || (typeof import.meta !== 'undefined' ? import.meta.env.JOBNIMBUS_API_KEY : undefined);
    const workflowId =
      process.env.JOBNIMBUS_REALTOR_WORKFLOW_ID ||
      (typeof import.meta !== 'undefined' ? import.meta.env.JOBNIMBUS_REALTOR_WORKFLOW_ID : undefined);

    if (!workflowId) {
      console.warn('JobNimbus realtor workflow ID not configured. Skipping workflow assignment.');
      return;
    }

    const response = await fetch(`https://app.jobnimbus.com/api1/jobs/${jobId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow: workflowId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('JobNimbus workflow assignment error:', response.status, errorText);
      return;
    }

    console.log('Job added to realtor partnership workflow:', jobId);
  } catch (error) {
    console.error('Failed to add job to workflow:', error);
  }
}

/**
 * Create a follow-up task in JobNimbus
 */
async function createJobNimbusTask(contactId: string, formData: FormSubmission, assigneeId?: string): Promise<void> {
  try {
    const apiKey =
      process.env.JOBNIMBUS_API_KEY || (typeof import.meta !== 'undefined' ? import.meta.env.JOBNIMBUS_API_KEY : undefined);

    if (!apiKey) {
      console.warn('JobNimbus API key not configured. Task creation skipped.');
      return;
    }

    const taskData = {
      contact_id: contactId,
      title: `Follow up: ${formData.formType} - ${formData.name}`,
      description: formData.message,
      due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Due tomorrow
      status: 'Open',
    };

    if (assigneeId) {
      (taskData as any).assigned_to = assigneeId;
    }

    await fetch('https://app.jobnimbus.com/api1/tasks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    console.log('JobNimbus follow-up task created for contact:', contactId);
  } catch (error) {
    console.error('Failed to create JobNimbus task:', error);
  }
}
