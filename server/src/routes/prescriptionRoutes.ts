import express from 'express';
import { getPrescriptions, getPrescriptionById, createPrescription, updatePrescription } from '../controllers/prescriptionController'

const router = express.Router();

router.get('/', getPrescriptions);
router.get('/:id', getPrescriptionById);
router.post('/', createPrescription);
router.put('/:id', updatePrescription);

export default router;
