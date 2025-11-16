import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const nextIntlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  return nextIntlMiddleware(req);
}

// Áp dụng cho tất cả route trừ api, _next, etc.
export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
