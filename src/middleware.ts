import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DISTINCT_ID_COOKIE = '__thursdai_id';
const PREVIEW_COOKIE = '__thursdai_preview';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const PREVIEW_MAX_AGE = 60 * 60 * 24;       // 24 hours

// NEXT_PUBLIC_ prefix is required — Next.js inlines these at build time
// for edge middleware. Plain process.env vars are NOT available in the edge runtime.
//
// To activate coming-soon mode:
//   Vercel → thursdai-website → Settings → Environment Variables
//   Add NEXT_PUBLIC_COMING_SOON=true (Production) → Redeploy
//
// To deactivate (go live):
//   Change NEXT_PUBLIC_COMING_SOON to false (or delete it) → Redeploy
//
// Preview bypass: visit /?preview=<NEXT_PUBLIC_PREVIEW_SECRET> to get
// a 24h cookie that skips the gate.
const COMING_SOON = process.env.NEXT_PUBLIC_COMING_SOON === 'true';
const BYPASS_SECRET = process.env.NEXT_PUBLIC_PREVIEW_SECRET ?? '';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Coming-soon gate ────────────────────────────────────────────
  if (COMING_SOON) {
    // 1. Bypass secret in URL → set cookie, redirect to clean URL
    const providedSecret = searchParams.get('preview');
    if (BYPASS_SECRET && providedSecret === BYPASS_SECRET) {
      const destination = new URL(request.url);
      destination.searchParams.delete('preview');
      const res = NextResponse.redirect(destination);
      res.cookies.set(PREVIEW_COOKIE, '1', {
        maxAge: PREVIEW_MAX_AGE,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      return res;
    }

    // 2. Preview cookie present → let through
    if (request.cookies.get(PREVIEW_COOKIE)?.value === '1') {
      // fall through to normal handling below
    } else if (pathname !== '/coming-soon') {
      // 3. Everyone else → coming soon
      const url = request.nextUrl.clone();
      url.pathname = '/coming-soon';
      return NextResponse.redirect(url);
    }
  }

  // ── PostHog distinct-ID cookie ──────────────────────────────────
  const response = NextResponse.next();
  if (!request.cookies.get(DISTINCT_ID_COOKIE)) {
    response.cookies.set(DISTINCT_ID_COOKIE, crypto.randomUUID(), {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|og-backgrounds|fonts|api).*)'],
};
