import { serialize } from "cookie";
import jwt from "jsonwebtoken";

import { JWTPayload } from "./types";

// Generate JWT Token
export function generateJWT(jwtPayload: JWTPayload): string {
    const privateKey = process.env.JWT_SECRET as string;

    const token = jwt.sign(jwtPayload, privateKey, {
        // No expiration time, making the token valid indefinitely
    });

    return token;
}

// Set Cookie with JWT
export function setCookie(jwtPayload: JWTPayload): string {
    const token = generateJWT(jwtPayload);

    const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // development=http, production=https
        sameSite: "strict",
        path: "/",
        // Cookie will not expire unless manually deleted by the user or browser session ends
    });

    return cookie;
}
