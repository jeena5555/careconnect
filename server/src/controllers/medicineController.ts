import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await prisma.medicine.findMany();
    res.send(medicines);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
