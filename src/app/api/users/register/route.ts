import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/db";
import { setCookie } from "@/utils/generateToken";
import { registerSchema } from "@/utils/validationSchemas";

/**
 *  @method  POST
 *  @route   ~/api/users/register
 *  @desc    Create New User (Register)
 *  @access  Public
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });
        if (existingUser) {
            return NextResponse.json(
                { message: "This email is already registered" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                role: "USER", // Default role
            },
            select: {
                id: true,
                email: true,
                role: true,
            },
        });

        const cookie = setCookie({ id: newUser.id, role: newUser.role });

        return NextResponse.json(
            { ...newUser, message: "Registered & Authenticated" },
            {
                status: 201,
                headers: { "Set-Cookie": cookie },
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
