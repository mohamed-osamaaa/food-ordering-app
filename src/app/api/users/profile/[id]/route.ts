import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/db";
import { UpdateUserDto } from "@/utils/dtos";
import { updateUserSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
    params: { id: string };
}

/**
 *  @method  PUT
 *  @route   ~/api/users/profile/:id
 *  @desc    Update Profile
 *  @access  private (only user himself can update his account/profile)
 */
export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
        });
        if (!user) {
            return NextResponse.json(
                { message: "user not found" },
                { status: 404 }
            );
        }

        const userFromToken = verifyToken(request);
        if (userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: "you are not allowed, access denied" },
                { status: 403 }
            );
        }

        const body = (await request.json()) as UpdateUserDto;
        const validation = updateUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }

        // Handle image upload if present
        let imageUrl: string | undefined;
        if (body.photo) {
            const uploadResult = await cloudinary.uploader.upload(body.photo, {
                folder: "user_profiles",
                use_filename: true,
                unique_filename: true,
            });
            imageUrl = uploadResult.secure_url;
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(params.id) },
            data: {
                email: body.email,
                password: body.password,
                photo: imageUrl, // Save Cloudinary image URL in the database
            },
        });

        const { password, ...other } = updatedUser;
        return NextResponse.json({ ...other }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 }
        );
    }
}
