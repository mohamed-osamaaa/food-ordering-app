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
        return res.status(400).json({ error: "Invalid category ID" });
    }

    if (req.method === "GET") {
        // Get a specific category by ID
        try {
            const category = await prisma.category.findUnique({
                where: { id: parseInt(id) },
            });
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch category" });
        }
    } else if (req.method === "DELETE") {
        // Delete category by ID
        try {
            const deletedCategory = await prisma.category.delete({
                where: { id: parseInt(id) },
            });
            res.status(200).json(deletedCategory);
        } catch (error) {
            res.status(500).json({ error: "Failed to delete category" });
        }
    } else if (req.method === "PUT") {
        // Edit category by ID
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Category name is required" });
        }
        try {
            const updatedCategory = await prisma.category.update({
                where: { id: parseInt(id) },
                data: { name },
            });
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ error: "Failed to update category" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
