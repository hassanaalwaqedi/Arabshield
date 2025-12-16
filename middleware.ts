import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware for Route Protection
 * 
 * Implements cookie-based session verification for protected routes.
 * The auth cookie is set on client-side login and checked here.
 * 
 * Flow:
 * 1. User logs in → AuthContext sets 'auth-session' cookie
 * 2. Middleware checks for cookie presence
 * 3. Protected routes require valid cookie
 * 4. Unauthenticated users redirected to login
 */

// Routes that require authentication
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

// Public routes that never require auth
const publicRoutes = [
    '/',
    '/about',
    '/services',
    '/case-studies',
    '/blog',
    '/portfolio',
    '/ai-solutions',
    '/ai-docs',
    '/partners',
    '/pricing',
    '/contact',
    '/order',
    '/privacy-policy',
    '/terms',
    '/faq',
    '/marketplace',
    '/verify-email',
    '/verify-success',
    '/support'
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the auth session cookie
    const authCookie = request.cookies.get('auth-session');
    const isAuthenticated = !!authCookie?.value;

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    // Check if it's an auth route (login/register)
    const isAuthRoute = authRoutes.some(route =>
        pathname === route
    );

    // Check if it's a public route
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    );

    // If accessing protected route without auth, redirect to login
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If authenticated and trying to access auth routes, redirect to dashboard
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // For all other routes, continue
    return NextResponse.next();
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
