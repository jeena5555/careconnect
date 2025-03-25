import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getTreatments = async (req: Request, res: Response) => {
  try {
    const treatments = await prisma.treatment.findMany();
    res.send(treatments);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getTreatmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const treatment = await prisma.treatment.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.send(treatment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getTreatmentType = async (req: Request, res: Response) => {
  try {
    const treatmentTypes = await prisma.treatmentType.findMany();
    res.send(treatmentTypes);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const createTreatment = async (req: Request, res: Response) => {
  const { treatmentTypeId, details, diagnose, appointmentId } = req.body;
  try {
    const newTreatment = await prisma.treatment.create({
      data: {
        treatmentTypeId: treatmentTypeId,
        details: details,
        diagnose: diagnose,
        appointmentId: appointmentId
      }
    })

    res.send(newTreatment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
