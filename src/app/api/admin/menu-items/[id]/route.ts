import { NextApiRequest, NextApiResponse } from "next";

import cloudinary from "@/utils/cloudinary";
import prisma from "@/utils/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    if (req.method === "GET") {
        try {
            const product = await prisma.product.findUnique({
                where: { id: parseInt(id) },
                include: {
                    category: true,
                    sizePrices: true,
                    extras: true,
                },
            });

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch product" });
        }
    } else if (req.method === "DELETE") {
        try {
            const deletedProduct = await prisma.product.delete({
                where: { id: parseInt(id) },
            });

            res.status(200).json(deletedProduct);
        } catch (error) {
            res.status(500).json({ error: "Failed to delete product" });
        }
    } else if (req.method === "PUT") {
        const { name, description, price, categoryId, count, imgBase64 } =
            req.body;

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

            const updatedProduct = await prisma.product.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    description,
                    price,
                    categoryId: parseInt(categoryId),
                    count: parseInt(count),
                    imgURL: imageUrl,
                },
            });

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: "Failed to update product" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
