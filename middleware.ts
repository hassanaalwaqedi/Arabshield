import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Protected routes that require authentication
const protectedRoutes = [
    '/dashboard',
    '/dashboard/invoices',
    '/dashboard/projects',
    '/dashboard/settings',
    '/dashboard/support',
    '/dashboard/tasks',
    '/dashboard/notifications',
    '/dashboard/admin'
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip i18n for API routes, static files, etc.
    if (
        pathname.startsWith('/api') ||
        pathname.startsWith('/_next') ||
        pathname.includes('.') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    // Get the auth session cookie
    const authCookie = request.cookies.get('auth-session');
    const isAuthenticated = !!authCookie?.value;

    // Strip locale prefix for route matching
    const pathnameWithoutLocale = pathname.replace(/^\/(ar|en)/, '') || '/';

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathnameWithoutLocale === route || pathnameWithoutLocale.startsWith(route + '/')
    );

    // Check if it's an auth route (login/register)
    const isAuthRoute = authRoutes.some(route =>
        pathnameWithoutLocale === route
    );

    // If accessing protected route without auth, redirect to login
    if (isProtectedRoute && !isAuthenticated) {
        const locale = pathname.startsWith('/en') ? '/en' : '';
        const loginUrl = new URL(`${locale}/login`, request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If authenticated and trying to access auth routes, redirect to dashboard
    if (isAuthRoute && isAuthenticated) {
        const locale = pathname.startsWith('/en') ? '/en' : '';
        return NextResponse.redirect(new URL(`${locale}/dashboard`, request.url));
    }

    // Apply i18n middleware for all other routes
    return intlMiddleware(request);
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - api routes
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico
         * - public files (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    ],
};
