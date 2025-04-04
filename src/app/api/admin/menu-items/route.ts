import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/utils/db';

// Define a type for the product creation request body
interface CreateProductRequest {
    name: string;
    description?: string;
    price: number;
    categoryId: number;
    count: number;
    imgURL?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const products = await prisma.product.findMany({
                include: {
                    category: true, // Include category for product details (optional)
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
            imgURL,
        }: CreateProductRequest = req.body;

        // Validate required fields
        if (!name || !categoryId || !price || !count) {
            return res.status(400).json({
                error: "Product name, category, price, and count are required",
            });
        }

        try {
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    categoryId: parseInt(categoryId.toString(), 10),
                    count: parseInt(count.toString(), 10),
                    imgURL,
                },
            });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: "Failed to create product" });
        }
    } else {
        // Handle unsupported methods
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
