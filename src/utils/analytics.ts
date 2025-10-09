/**
 * Google Analytics 4 Event Tracking Utilities
 * Documentation: https://developers.google.com/analytics/devguides/collection/ga4
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export type EventName =
  | 'form_submit'
  | 'cta_click'
  | 'phone_click'
  | 'email_click'
  | 'partnership_inquiry'
  | 'inspection_request'
  | 'page_view';

export interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  form_type?: string;
  agent_type?: string;
  cta_location?: string;
  [key: string]: any;
}

/**
 * Track a custom event in Google Analytics 4
 */
export function trackEvent(eventName: EventName, params?: EventParams): void {
  if (typeof window === 'undefined') return;

  // Check if gtag is available
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
    console.log('GA4 Event tracked:', eventName, params);
  } else {
    console.warn('GA4 gtag not available. Event not tracked:', eventName);
  }
}

/**
 * Track form submission conversion
 */
export function trackFormSubmission(formType: 'general' | 'inspection' | 'partnership'): void {
  trackEvent('form_submit', {
    event_category: 'engagement',
    form_type: formType,
    value: formType === 'partnership' ? 100 : formType === 'inspection' ? 75 : 50,
  });

  // Track specific conversion events
  if (formType === 'partnership') {
    trackEvent('partnership_inquiry', {
      event_category: 'conversion',
      event_label: 'Partnership Form',
      value: 100,
    });
  } else if (formType === 'inspection') {
    trackEvent('inspection_request', {
      event_category: 'conversion',
      event_label: 'Inspection Form',
      value: 75,
    });
  }
}

/**
 * Track CTA button click
 */
export function trackCTAClick(ctaText: string, location: string): void {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaText,
    cta_location: location,
  });
}

/**
 * Track phone number click (click-to-call)
 */
export function trackPhoneClick(phoneNumber: string): void {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: phoneNumber,
    value: 25,
  });
}

/**
 * Track email click
 */
export function trackEmailClick(email: string): void {
  trackEvent('email_click', {
    event_category: 'engagement',
    event_label: email,
  });
}

/**
 * Set user properties for segmentation
 */
export function setUserProperty(propertyName: string, value: string): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('set', 'user_properties', {
      [propertyName]: value,
    });
  }
}

/**
 * Initialize GA4 tracking
 */
export function initGA4(measurementId: string): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  console.log('GA4 initialized with ID:', measurementId);
}
