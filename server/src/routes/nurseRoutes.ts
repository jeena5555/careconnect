import express from 'express';
import { getNurses, getNurseById, createAccountNurse } from '../controllers/nurseController';

const router = express.Router();

router.get('/', getNurses);
router.get('/:id', getNurseById);
router.post('/', createAccountNurse);

export default router;
