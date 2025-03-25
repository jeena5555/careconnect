import express from 'express';
import { getTreatments, getTreatmentById, getTreatmentType, createTreatment } from '../controllers/treatmentController';

const router = express.Router();

router.get('/', getTreatments);
router.get('/:id', getTreatmentById);
router.get('/treatmenttype', getTreatmentType);
router.post('/', createTreatment);

export default router;
