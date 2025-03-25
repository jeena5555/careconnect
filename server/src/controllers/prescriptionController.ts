import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getPrescriptions = async (req: Request, res: Response) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      include: {
        prescriptionMedicines: true,
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });
    res.send(prescriptions)
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getPrescriptionById = async (req: Request, res: Response) => {
  try {
    const prescription = await prisma.prescription.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        prescriptionMedicines: {
          include: {
            medicine: true,
          },
        },
        appointment: {
          include: {
            patient: true,
            doctor: true,
          },
        },
      },
    });
    res.send(prescription)
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

// medicines ต้องส่งมาเป็น list
export const createPrescription = async (req: Request, res: Response) => {
  const { prescriptionDetail, appointmentId, medicines } = req.body;
  try {
    const prescription = await prisma.prescription.create({
      data: {
        prescriptionDetail: prescriptionDetail,
        appointmentId: appointmentId,
        prescriptionStatus: "MedicationNotGiven"
      }
    });

    for (const { medicineId, medicine, quantity, duration } of medicines) {
      await prisma.prescriptionMedicines.create({
        data: {
          prescriptionId: prescription.id,
          medicineId: medicineId,
          quantity: Number(quantity),
          duration: Number(duration)
        }
      });

      await prisma.medicine.update({
        where: { id: medicineId },
        data: { stockQuantity: { decrement: Number(quantity) } }
      });
    }

    res.send(prescription);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export const updatePrescription = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const appointment = await prisma.prescription.update({
      where: {
        id: Number(id)
      },
      data: {
        prescriptionStatus: 'MedicationGiven'
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}
