import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        doctors: true,
      }
  });
    res.send(departments);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const department = await prisma.department.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        doctors: true,
      },
    });
    res.send(department);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}
