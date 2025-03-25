import express from 'express';
import { getAccounts, getAccountById, createAccountPatient } from '../controllers/accountController';

const router = express.Router();

router.get('/', getAccounts);
router.get('/:id', getAccountById);
router.post('/', createAccountPatient);

export default router;
