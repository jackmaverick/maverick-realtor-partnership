/**
 * Client-side analytics bootstrapper.
 *
 * Handles delegated event tracking for CTA, phone, and email interactions.
 */
import { trackCTAClick, trackEmailClick, trackPhoneClick } from '../utils/analytics';

const AUTO_CTA_PATHS = ['/contact', '/services', '/locations', '/resources', '/about'];

function normalizePhoneHref(href: string): string {
  return href.replace(/^tel:/i, '').replace(/[^\d+]/g, '');
}

function handleClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const anchor = target.closest<HTMLAnchorElement>('a');
  if (!anchor) return;

  const href = anchor.getAttribute('href') ?? '';

  // Track CTA clicks based on explicit data attributes.
  const ctaElement = target.closest<HTMLElement>('[data-analytics-cta]');
  const isNavigationLink = !!anchor.closest('nav');
  const isAutoCta =
    !ctaElement &&
    !isNavigationLink &&
    AUTO_CTA_PATHS.some((path) => href.startsWith(path));

  if (ctaElement || isAutoCta) {
    const label =
      ctaElement?.getAttribute('data-analytics-label') ??
      anchor.textContent?.trim() ??
      'CTA Click';

    const location =
      ctaElement?.getAttribute('data-analytics-location') ??
      window.location.pathname;

    trackCTAClick(label, location);
  }

  // Track phone clicks (click-to-call).
  if (href.toLowerCase().startsWith('tel:')) {
    trackPhoneClick(normalizePhoneHref(href));
  }

  // Track email clicks (mailto).
  if (href.toLowerCase().startsWith('mailto:')) {
    trackEmailClick(href.replace(/^mailto:/i, '').trim());
  }
}

export function initClientAnalytics(): void {
  document.addEventListener('click', handleClick);
}
