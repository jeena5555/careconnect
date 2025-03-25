import express from 'express';
import { getTreatmentType } from '../controllers/treatmentController';

const router = express.Router();

router.get('/', getTreatmentType);



export default router;
