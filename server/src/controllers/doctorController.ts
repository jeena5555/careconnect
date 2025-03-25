import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        department: true
      }
    });

    const formattedDoctors = doctors.map(doctor => ({
      id: doctor.id,
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      phone: doctor.phone,
      email: doctor.email,
      address: doctor.address,
      description: doctor.description,
      departmentName: doctor.department.name,
    }));

    res.send(formattedDoctors);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        department: true
      }
    });
    res.send(doctor);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// API ไว้สร้าง mock
export const createAccountDoctor = async (req: Request, res: Response) => {
  const {
    accountName,
    password,
    firstName,
    lastName,
    phone,
    email,
    address,
    description,
    department
  } = req.body;
  try {
    const newAccount = await prisma.account.create({
      data: {
        accountName: accountName,
        password: password,
        role: "DOCTOR"
      }
    })

    const newDoctor = await prisma.doctor.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        address: address,
        description: description,
        departmentId: department,
        accountId: newAccount.id
      }
    })

    res.send(newDoctor);
} catch (err: any) {
  res.status(err.status || 500).json({ message: err.message });
}
};
