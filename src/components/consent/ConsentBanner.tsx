'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  getConsent,
  onConsentReview,
  privacySignal,
  setConsent,
  subscribe,
  type ConsentChoice,
} from '@/lib/consent';
import { loadClarity, revokeClarity } from '@/lib/clarity';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

// Test hook: `?consent-preview` shows the banner in builds without a Clarity project id
// (CI has none), so the a11y suite can check it. It only works when there is nothing to
// load, so it cannot switch Clarity on or get around a stored choice or a privacy signal.
function previewRequested(): boolean {
  if (CLARITY_ID) return false;
  try {
    return new URLSearchParams(window.location.search).has('consent-preview');
  } catch {
    return false;
  }
}

/**
 * Fixed to the bottom of the viewport and rendered only after hydration, so it never moves
 * the page (no layout shift) and is not part of the server HTML. Not a dialog: it does not
 * take or trap focus when it first appears. Reopened from the footer, it takes focus and
 * hands it back to the "Cookie settings" button once a choice is made.
 */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [signal, setSignal] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const preview = previewRequested();
    if (!CLARITY_ID && !preview) return;

    setSignal(privacySignal());
    if (getConsent() === 'granted') loadClarity(CLARITY_ID);
    if (getConsent() === 'unset') setOpen(true);

    const offChange = subscribe((state) => {
      if (state === 'granted') loadClarity(CLARITY_ID);
      else revokeClarity();
    });
    const offReview = onConsentReview(() => {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setSignal(privacySignal());
      setOpen(true);
      // After the render that shows the banner.
      requestAnimationFrame(() => regionRef.current?.focus());
    });
    return () => {
      offChange();
      offReview();
    };
  }, []);

  function close() {
    setOpen(false);
    const el = returnFocus.current;
    returnFocus.current = null;
    if (el && el.isConnected) el.focus();
  }

  function choose(choice: ConsentChoice) {
    setConsent(choice);
    close();
  }

  if (!open) return null;

  return (
    <section
      ref={regionRef}
      role="region"
      aria-labelledby="consent-banner-title"
      tabIndex={-1}
      className="consent-banner"
      data-consent-banner=""
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex-1 min-w-0">
          <p id="consent-banner-title" className="rec-label m-0 mb-1.5">
            Cookies
          </p>
          {signal ? (
            <p className="consent-banner-text m-0">
              Your browser sends a Global Privacy Control or Do Not Track signal, so Microsoft Clarity stays
              off. <Link href="/privacy#cookies">Privacy</Link>
            </p>
          ) : (
            <p className="consent-banner-text m-0">
              Microsoft Clarity is session analytics that helps us see how the site is used; it sets cookies and
              stays off unless you accept. <Link href="/privacy#cookies">Privacy</Link>
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-3 shrink-0">
          {signal ? (
            <Button variant="secondary" className="consent-banner-button" onClick={close}>
              Close
            </Button>
          ) : (
            <>
              {/* Equal prominence: same variant, size and weight. Neither is the default. */}
              <Button variant="secondary" className="consent-banner-button" onClick={() => choose('denied')}>
                Decline
              </Button>
              <Button variant="secondary" className="consent-banner-button" onClick={() => choose('granted')}>
                Accept
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
