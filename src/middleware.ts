import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { randomUUID } from 'crypto';

const DISTINCT_ID_COOKIE = '__thursdai_id';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set a stable anonymous distinct ID for PostHog A/B testing
  // Only set if not already present — never overwrite an existing ID
  if (!request.cookies.get(DISTINCT_ID_COOKIE)) {
    response.cookies.set(DISTINCT_ID_COOKIE, randomUUID(), {
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
