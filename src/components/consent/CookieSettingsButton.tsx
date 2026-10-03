'use client';

import { requestConsentReview } from '@/lib/consent';

/** Footer control that reopens the consent banner, so consent is as easy to withdraw as to give. */
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  return (
    <button type="button" className={`footer-link footer-link-button ${className}`} onClick={requestConsentReview}>
      Cookie settings
    </button>
  );
}
