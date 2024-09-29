const express = require('express');
const { check } = require('express-validator');


const appointmentsController = require('../Controller/appointments-controllers');


const router = express.Router();


router.get('/', appointmentsController.getAppointment);
router.get('/:docid', appointmentsController.getbydoc);
router.get('/pati/:patientid', appointmentsController.getbypatient);
router.get('/hos/:hosid', appointmentsController.getbyhospital);

router.post(
 '/',
 appointmentsController.signup
);

router.delete('/:appointmentId', appointmentsController.deleteAppointment);

router.patch('/appo/:appointmentId', appointmentsController.confirmappo);
router.patch('/:appointmentId', appointmentsController.updateAppointment);

// router.post('/login', usersController.login);


module.exports = router;
