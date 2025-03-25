import { Request, Response } from 'express';
import prisma from '../models/prismaClient';

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
        prescription: true,
        invoice: true,
        treatment: true
      }
    });
    res.send(appointments);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        patient: true,
        doctor: true,
        prescription: {
          include: {
            prescriptionMedicines: {
              include: {
                medicine: true
              }
            }
          }
        },
        invoice: true,
        treatment: {
          include: {
            treatmentType: true
          }
        }
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getAppointmentByPatient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.findMany({
      where: {
        patientId: Number(id)
      },
      include: {
        patient: true,
        doctor: true,
        prescription: true,
        invoice: true,
        treatment: true
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const getAppointmentByDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.findMany({
      where: {
        doctorId: Number(id)
      },
      include: {
        patient: true,
        doctor: true,
        prescription: true,
        invoice: true,
        treatment: true
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  const {
    appointmentDate,
    appointmentStartTime,
    appointmentEndTime,
    patientId,
    doctorId,
    symptom,
  } = req.body;

  try {
    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate,
        appointmentStartTime,
        appointmentEndTime,
        patientId,
        doctorId,
        symptom,
        appointmentStatus: "NotTreated",
      },
      include: {
        patient: {
          select: {
            id: true,
            prefix: true,
            firstName: true,
            lastName: true
          }
        },
        doctor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            department: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};


export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { appointmentDate,
    appointmentStartTime,
    appointmentEndTime,
    patientId,
    doctorId,
    symptom,
   } = req.body;
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: Number(id)
      },
      data: {
        appointmentDate: appointmentDate,
        appointmentStartTime: appointmentStartTime,
        appointmentEndTime: appointmentEndTime,
        patientId: patientId,
        doctorId: doctorId,
        symptom: symptom,
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.delete({
      where: {
        id: Number(id)
      }
    });
    res.send(appointment);
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
}
