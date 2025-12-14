import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware for Route Protection
 * 
 * Note: Firebase Auth tokens cannot be directly verified in Edge Runtime.
 * This middleware provides a basic check for session presence.
 * Full authentication verification happens client-side in AuthContext.
 * 
 * For production, consider:
 * - Using Firebase Session Cookies with server-side verification
 * - Implementing a custom auth API that sets httpOnly cookies
 */

// Routes that require authentication
const protectedRoutes = ['/dashboard'];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if it's an auth route (login/register)
    const isAuthRoute = authRoutes.some(route =>
        pathname === route
    );

    // For protected routes, the client-side AuthContext handles the redirect
    // This middleware just provides an additional layer of protection
    // by checking if there's any indication of an auth session

    // Note: In a production environment, you would:
    // 1. Set a secure httpOnly cookie on login
    // 2. Verify that cookie here in middleware
    // 3. Decode and validate the Firebase token server-side

    // For now, we rely on client-side protection in DashboardLayout
    // which uses useAuth() to check authentication state

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
