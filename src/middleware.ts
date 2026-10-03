import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isBypassGranted, resolveBypassSecret } from '@/lib/preview-bypass';

const PREVIEW_COOKIE    = '__thursdai_preview';
const PREVIEW_MAX_AGE   = 60 * 60 * 24;        // 24 hours

// ─────────────────────────────────────────────────────────────────
// COMING SOON MODE
// Set to true  → all visitors see /coming-soon
// Set to false → full site is live
//
// When you're ready to launch: change the line below to `false`
// and push. The preview bypass (below) needs COMING_SOON_BYPASS_SECRET.
// ─────────────────────────────────────────────────────────────────
const COMING_SOON = false;

// Preview bypass: visit /?preview=<secret> to get a 24h cookie that skips the coming-soon gate.
// The secret is the server-only env var COMING_SOON_BYPASS_SECRET (at least 16 characters);
// unset or shorter, the bypass is off and the query parameter does nothing. The value that used
// to be hard-coded here is public in git history and must never be reused.

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ── Coming-soon gate ───────────────────────────────────────────
  if (COMING_SOON) {
    // 1. Bypass secret in URL → set cookie, redirect to clean URL
    const bypassSecret = resolveBypassSecret(process.env.COMING_SOON_BYPASS_SECRET);
    if (isBypassGranted(searchParams.get('preview'), bypassSecret)) {
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

  return NextResponse.next();
}

// Every page, not just /coming-soon: with COMING_SOON on, the gate has to see every request.
// The middleware sets no cookie of its own (the __thursdai_id visitor cookie was removed).
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|og-backgrounds|fonts|api).*)'],
};
