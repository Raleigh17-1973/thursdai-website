// Microsoft Clarity, loaded only after the visitor accepts it in the consent banner
// (src/components/consent/ConsentBanner.tsx). It is the same tag the root layout used to
// inject on every page, now added from the client. The CSP allowances for clarity.ms in
// next.config.ts are unchanged.
//
// Clarity cannot be unloaded once its script has run. Withdrawing consent tells Clarity to
// stop (its consent API, `clarity('consent', false)`) and nothing more is loaded; the
// script is gone from the next page load on.

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
type ClarityWindow = Window & { clarity?: ClarityFn };

let injected = false;

export function clarityLoaded(): boolean {
  return injected;
}

export function loadClarity(projectId: string | undefined): void {
  if (!projectId || typeof document === 'undefined') return;
  const w = window as ClarityWindow;
  if (!injected) {
    injected = true;
    w.clarity =
      w.clarity ||
      function (...args: unknown[]) {
        ((w.clarity as ClarityFn).q = (w.clarity as ClarityFn).q || []).push(args);
      };
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
    document.head.appendChild(s);
  }
  // Queued until the tag runs, then applied: the visitor has consented to cookies.
  w.clarity?.('consent');
}

export function revokeClarity(): void {
  const w = window as ClarityWindow;
  if (typeof w.clarity === 'function') w.clarity('consent', false);
}
