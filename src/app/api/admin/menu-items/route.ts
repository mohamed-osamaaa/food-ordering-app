import { NextApiRequest, NextApiResponse } from "next";

import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/db";

interface CreateProductRequest {
    name: string;
    description?: string;
    price: number;
    categoryId: number;
    count: number;
    imgBase64?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const products = await prisma.product.findMany({
                include: {
                    category: true,
                },
            });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch products" });
        }
    } else if (req.method === "POST") {
        const {
            name,
            description,
            price,
            categoryId,
            count,
            imgBase64,
        }: CreateProductRequest = req.body;

        if (!name || !categoryId || !price || !count) {
            return res.status(400).json({
                error: "Product name, category, price, and count are required",
            });
        }

        try {
            let imageUrl: string | undefined;

            if (imgBase64) {
                const uploadResult = await cloudinary.uploader.upload(
                    imgBase64,
                    {
                        folder: "products",
                        use_filename: true,
                        unique_filename: true,
                    }
                );
                imageUrl = uploadResult.secure_url;
            }

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    categoryId: parseInt(categoryId.toString(), 10),
                    count: parseInt(count.toString(), 10),
                    imgURL: imageUrl,
                },
            });

            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: "Failed to create product" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
