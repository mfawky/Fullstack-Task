import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is working' });
});

app.get('/apartments', async (req: Request, res: Response) => {
  try {
    const { q, city, minPrice, maxPrice, bedrooms, bathrooms } = req.query;

    const filters: any = {};

    if (city) filters.city = { contains: city as string, mode: 'insensitive' };
    if (bedrooms) filters.bedrooms = Number(bedrooms);
    if (bathrooms) filters.bathrooms = Number(bathrooms);
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.gte = Number(minPrice);
      if (maxPrice) filters.price.lte = Number(maxPrice);
    }
    if (q) {
      filters.OR = [
        { title: { contains: q as string, mode: 'insensitive' } },
        { description: { contains: q as string, mode: 'insensitive' } },
        { address: { contains: q as string, mode: 'insensitive' } },
        { city: { contains: q as string, mode: 'insensitive' } },
      ];
    }

    const apartments = await prisma.apartment.findMany({
      where: filters,
      orderBy: { id: 'desc' },
    });

    res.status(200).json(apartments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/apartments/:id', async (req: Request, res: Response) => {
  try {
    const apartment = await prisma.apartment.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.status(200).json(apartment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/apartments', async (req: Request, res: Response) => {
  try {
    const { title, description, price, city, address, bedrooms, bathrooms, floor, sqft, image } = req.body;
    const apartment = await prisma.apartment.create({
      data: {
        title,
        description: description || null,
        price: Number(price),
        city,
        address,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        floor: Number(floor),
        sqft: sqft ? Number(sqft) : null,
        image: image || null,
      },
    });
    res.status(201).json(apartment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));