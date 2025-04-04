import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/utils/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid product ID" });
    }

    if (req.method === "GET") {
        // Get a specific product by ID
        try {
            const product = await prisma.product.findUnique({
                where: { id: parseInt(id) },
                include: {
                    category: true, // Include category details (optional)
                    sizePrices: true, // Include size prices if needed
                    extras: true, // Include extras if needed
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
        // Delete a specific product by ID
        try {
            const deletedProduct = await prisma.product.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json(deletedProduct);
        } catch (error) {
            res.status(500).json({ error: "Failed to delete product" });
        }
    } else if (req.method === "PUT") {
        // Edit a specific product by ID
        const { name, description, price, categoryId, count, imgURL } =
            req.body;

        if (!name || !categoryId || !price || !count) {
            return res.status(400).json({
                error: "Product name, category, price, and count are required",
            });
        }

        try {
            const updatedProduct = await prisma.product.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    description,
                    price,
                    categoryId: parseInt(categoryId),
                    count: parseInt(count),
                    imgURL,
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
