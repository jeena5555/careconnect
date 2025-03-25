import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const account = await prisma.account.findMany({
      include: {
        doctor: true,
        patient: true,
        nurse: true,
      }
    });
    res.send(account)
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        doctor: true,
        patient: true,
        nurse: true,
      }
    });

    if (!account) {
      return res.status(400).json({ error: "Account ID not found." }); //ส่งไปยังหน้าบ้าน
    }

    res.send(account)

  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export const createAccountPatient = async (req: Request, res: Response) => {
  const {
    accountName,
    password,
    prefix,
    firstName,
    lastName,
    personalId,
    gender,
    nationality,
    dob,
    height,
    weight,
    bloodGroup,
    phone,
    address,
    allergy,
  } = req.body;
  try {
    const existingAccount = await prisma.account.findUnique({
      where: { accountName: accountName },
    });

    if (existingAccount) {
      return res.status(400).json({ message: "Account name already exists." });
    }

    const newAccountPatient = await prisma.account.create({
      data: {
        accountName: accountName,
        password: password,
        role: "PATIENT"
      }
    })

    const newPatient = await prisma.patient.create({
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
        accountId: newAccountPatient.id
      }
    })

    res.send(newPatient);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
