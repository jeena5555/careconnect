import express from 'express';
import { getDoctors, getDoctorById, createAccountDoctor } from '../controllers/doctorController';

const router = express.Router();

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post('/', createAccountDoctor);

export default router;
