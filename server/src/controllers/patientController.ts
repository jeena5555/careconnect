import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await prisma.patient.findMany();
    res.send(patients);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const doctor = await prisma.patient.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        appointment: true,
      }
    });
    res.send(doctor);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getAccountPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        accountId: Number(id)
      },
      include: {
        appointment: true,
      }
    });
    res.send(patient);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }

}

export const updatePatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { prefix, firstName, lastName, personalId, gender, nationality, dob, height, weight, bloodGroup, phone, address, allergy } = req.body;

  try {
    const patient = await prisma.patient.update({
      where: {
        id: Number(id)
      },
      data: {
        prefix: prefix,
        firstName: firstName,
        lastName: lastName,
        personalId: personalId,
        gender: gender,
        nationality: nationality,
        dob: new Date(dob),
        height: Number(height),
        weight: Number(weight),
        bloodGroup: bloodGroup,
        phone: phone,
        address: address,
        allergy: allergy,
      }
    });
    res.send(patient);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}
