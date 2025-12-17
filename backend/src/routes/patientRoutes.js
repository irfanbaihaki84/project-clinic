const express = require('express');
const router = express.Router();
const pasienController = require('../controllers/patientController');

router.get('/', pasienController.getAllPatients);
router.post('/', pasienController.createPatient);
router.get('/:id', pasienController.getPatientById);
router.put('/:id', pasienController.updatePatient);
router.delete('/:id', pasienController.deletePatient);
router.put('/:id/inactive', pasienController.inActivePatient);
router.put('/:id/active', pasienController.activePatient);

module.exports = router;
