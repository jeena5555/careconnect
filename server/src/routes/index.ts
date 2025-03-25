import express from "express"

import accountRoutes from './accountRoutes';
import appointmentRoutes from './appointmentRoutes';
import departmentRoutes from './departmentRoutes';
import doctorRoutes from './doctorRoutes';
import invoiceRoutes from './invoiceRoutes';
import nurseRoutes from './nurseRoutes';
import patientRoutes from './patientRoutes';
import prescriptionRoutes from './prescriptionRoutes';
import treatmentRoutes from './treatmentRoutes';
import TreatmentTypeRoutes from './treatmentTypeRoutes';
import MedicineRoutes from './medicineRoutes'

const router = express.Router();

router.use('/account', accountRoutes);
router.use('/appointment', appointmentRoutes)
router.use('/department', departmentRoutes);
router.use('/doctor', doctorRoutes);
router.use('/invoice', invoiceRoutes);
router.use('/nurse', nurseRoutes);
router.use('/patient', patientRoutes);
router.use('/prescription', prescriptionRoutes);
router.use('/treatment', treatmentRoutes);
router.use('/treatmenttype', TreatmentTypeRoutes);
router.use('/medicine', MedicineRoutes);


export default router;
