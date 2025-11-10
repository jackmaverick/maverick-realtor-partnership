export interface FormSubmission {
  formType: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  agentType?: string;
  annualRoofVolume?: number;
  [key: string]: any;
}
