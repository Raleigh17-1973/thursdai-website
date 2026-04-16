import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DISTINCT_ID_COOKIE = '__thursdai_id';
const PREVIEW_COOKIE = '__thursdai_preview';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const PREVIEW_MAX_AGE = 60 * 60 * 24;       // 24 hours

// Set COMING_SOON_MODE=true in Vercel env vars to activate.
// Set PREVIEW_BYPASS_SECRET to a hard-to-guess string (e.g. a UUID).
// Visiting /?preview=<secret> grants 24h access to the real site.
const COMING_SOON = process.env.COMING_SOON_MODE === 'true';
const BYPASS_SECRET = process.env.PREVIEW_BYPASS_SECRET ?? '';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Coming-soon gate ────────────────────────────────────────────
  if (COMING_SOON) {
    // 1. If the request carries the bypass secret, set the cookie and redirect
    //    to the real page (stripping the ?preview param).
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

    // 2. If the visitor already has the preview cookie, let them through.
    if (request.cookies.get(PREVIEW_COOKIE)?.value === '1') {
      // Fall through to normal handling below.
    } else if (pathname !== '/coming-soon') {
      // 3. Everyone else → coming soon (unless they're already there).
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
  // Run on all routes except static files, API, and _next internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|og-backgrounds|fonts|api).*)'],
};
