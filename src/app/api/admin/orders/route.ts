import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/utils/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const orders = await prisma.order.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            phone: true,
                            address: true,
                        },
                    },
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                    imgURL: true,
                                },
                            },
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });

            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch orders" });
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
