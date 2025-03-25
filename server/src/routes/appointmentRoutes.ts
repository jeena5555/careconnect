import express from 'express';
import { getAppointments, getAppointmentById, getAppointmentByPatient, getAppointmentByDoctor, updateAppointment, createAppointment, deleteAppointment } from '../controllers/appointmentController';

const router = express.Router();

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.get('/patient/:id', getAppointmentByPatient);
router.get('/doctor/:id', getAppointmentByDoctor);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
