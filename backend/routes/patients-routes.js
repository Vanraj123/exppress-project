const express = require('express');
const { check } = require('express-validator');


const patientsController = require('../Controller/patients-controllers');


const router = express.Router();


router.get('/', patientsController.getPatient);
router.get('/doc/:docid', patientsController.getbydoc);

router.post(
 '/',
 patientsController.signup
);

// DELETE a patient by ID
router.delete('/:patientId', patientsController.deletePatient);

// PATCH to update a patient by ID
router.patch('/:patientId', patientsController.updatePatient);

router.get('/:userId', patientsController.getbyId);

// router.post('/login', usersController.login);


module.exports = router;
