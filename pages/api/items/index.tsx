import { prisma } from '../../../prismaClient';

export default async function handle(req: any, res: any) {
  try {
    if (req.method === 'GET') {
      const items = await prisma.item.findMany();
      return res.json(items);
    } else if (req.method === 'POST') {
      const { name, info } = req.body;
      const newItem = await prisma.item.create({
        data: { name, info },
      });
      return res.json(newItem);
    } else if (req.method === 'DELETE') {
      const deleteItems = await prisma.item.deleteMany();
      return res.json({ message: 'All items deleted', deletedCount: deleteItems.count });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

