import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    role: true,
                    phone: true,
                    address: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch users" });
        }
    }

    if (req.method === "PUT") {
        const { id, role } = req.body;

        if (!id || !role) {
            return res
                .status(400)
                .json({ error: "User ID and new role are required" });
        }

        if (!["ADMIN", "USER"].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        try {
            const updatedUser = await prisma.user.update({
                where: { id: Number(id) },
                data: { role },
                select: {
                    id: true,
                    email: true,
                    role: true,
                },
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res
                .status(500)
                .json({ error: "Failed to update user role" });
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
