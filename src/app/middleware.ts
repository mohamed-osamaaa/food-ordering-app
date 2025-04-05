import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("jwtToken")?.value;

    if (token) {
        try {
            const secret = process.env.JWT_SECRET;
            const decoded = jwt.verify(token, secret) as { role: string };

            if (
                decoded.role === "ADMIN" &&
                !request.nextUrl.pathname.startsWith("/admin")
            ) {
                return NextResponse.redirect(new URL("/admin", request.url));
            } else if (
                decoded.role === "USER" &&
                request.nextUrl.pathname !== "/"
            ) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        } catch (error) {
            console.error("JWT verification failed:", error);
        }
    } else {
        console.log("No JWT token found in cookies.");
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/admin/:path*"],
};
