import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("jwtToken")?.value;

    if (token) {
        try {
            const secret = process.env.JWT_SECRET!;
            const decoded = jwt.verify(token, secret) as { userId: string };

            const baseUrl = request.nextUrl.origin;

            const res = await fetch(`${baseUrl}/api/users`);
            const users = await res.json();

            const user = users.find(
                (u: any) => u.id.toString() === decoded.userId
            );

            if (!user) {
                console.error("User not found in fetched users.");
                return NextResponse.redirect(new URL("/", request.url));
            }

            const role = user.role;

            if (
                role === "ADMIN" &&
                !request.nextUrl.pathname.startsWith("/admin")
            ) {
                return NextResponse.redirect(new URL("/admin", request.url));
            } else if (
                role === "USER" &&
                request.nextUrl.pathname === "/admin"
            ) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        } catch (error) {
            console.error("Middleware error:", error);
        }
    } else {
        console.log("No JWT token found in cookies.");
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/admin/:path*"],
};
