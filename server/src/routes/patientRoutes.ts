import express from 'express';
import { getPatients, getPatientById, getAccountPatientById} from '../controllers/patientController';

const router = express.Router();

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.get('/account/:id', getAccountPatientById);
router.put('/:id', getPatientById);

export default router;
