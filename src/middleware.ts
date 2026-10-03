import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { matchesBypassSecret, readBypassSecret } from '@/lib/preview-bypass';

const DISTINCT_ID_COOKIE = '__thursdai_id';
const PREVIEW_COOKIE    = '__thursdai_preview';
const COOKIE_MAX_AGE    = 60 * 60 * 24 * 365; // 1 year
const PREVIEW_MAX_AGE   = 60 * 60 * 24;        // 24 hours

// ─────────────────────────────────────────────────────────────────
// COMING SOON MODE
// Set to true  → all visitors see /coming-soon
// Set to false → full site is live
//
// When you're ready to launch: change the line below to `false`
// and push. (The preview bypass below is the one thing that needs an env var.)
// ─────────────────────────────────────────────────────────────────
const COMING_SOON = false;

// Preview bypass secret: visit /?preview=<this> to get a 24h cookie that skips the
// coming-soon gate. It comes from PREVIEW_BYPASS_SECRET and fails closed: with the variable
// unset or empty no URL value can match, so the gate has no bypass. (An earlier build
// hard-coded a secret in this file; it is in git history, so treat it as burned and never reuse it.)
const BYPASS_SECRET = readBypassSecret(process.env.PREVIEW_BYPASS_SECRET);

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Coming-soon gate ───────────────────────────────────────────
  if (COMING_SOON) {
    // 1. Bypass secret in URL → set cookie, redirect to clean URL
    if (matchesBypassSecret(searchParams.get('preview'), BYPASS_SECRET)) {
      const destination = new URL(request.url);
      destination.searchParams.delete('preview');
      const res = NextResponse.redirect(destination);
      res.cookies.set(PREVIEW_COOKIE, '1', {
        maxAge: PREVIEW_MAX_AGE,
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        path: '/',
      });
      return res;
    }

    // 2. Preview cookie present → let through
    if (request.cookies.get(PREVIEW_COOKIE)?.value === '1') {
      // fall through
    } else if (pathname !== '/coming-soon') {
      // 3. Everyone else → /coming-soon
      const url = request.nextUrl.clone();
      url.pathname = '/coming-soon';
      return NextResponse.redirect(url);
    }
  }

  // ── Retired coming-soon page ───────────────────────────────────
  // The full site is live. Redirect any bookmarked /coming-soon links to home.
  if (!COMING_SOON && pathname === '/coming-soon') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ── PostHog distinct-ID cookie ─────────────────────────────────
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
