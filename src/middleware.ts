import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
// and push. No env vars needed.
// ─────────────────────────────────────────────────────────────────
const COMING_SOON = false;

// Preview bypass secret — visit /?preview=<this> to get a 24h
// cookie that skips the coming-soon gate.
const BYPASS_SECRET = '31151b03-3db3-4184-9d65-eb05c02df216';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Coming-soon gate ───────────────────────────────────────────
  if (COMING_SOON) {
    // 1. Bypass secret in URL → set cookie, redirect to clean URL
    if (searchParams.get('preview') === BYPASS_SECRET) {
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
