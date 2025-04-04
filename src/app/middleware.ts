import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { verifyToken } from '../utils/verifyToken';

// Define paths you want to protect
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only apply middleware to admin routes
    const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route)
    );
    if (!isAdminRoute) {
        return NextResponse.next(); // Allow all other routes
    }

    const user = verifyToken(request);

    // If no user or not admin, deny access
    if (!user || user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next(); // Allow if user is admin
}

export const config = {
    matcher: ["/admin/:path*"],
};
