import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getNurses = async (req: Request, res: Response) => {
  try {
    const nurses = await prisma.nurse.findMany();
    res.send(nurses);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getNurseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const nurse = await prisma.nurse.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.send(nurse);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// API ไว้สร้าง mock
export const createAccountNurse = async (req: Request, res: Response) => {
  const { accountName, password, firstName, lastName, phone, email, address } = req.body;
  try {
    const newAccount = await prisma.account.create({
      data: {
        accountName: accountName,
        password: password,
        role: "NURSE"
      }
    })

    const newNurse = await prisma.nurse.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        address: address,
        accountId: newAccount.id
      }
    })

    res.send(newNurse);
} catch (err: any) {
  res.status(err.status || 500).json({ message: err.message });
}
};
