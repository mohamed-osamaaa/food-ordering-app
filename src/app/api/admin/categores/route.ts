import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import prisma from '@/utils/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const categories = await prisma.category.findMany();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch categories" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
