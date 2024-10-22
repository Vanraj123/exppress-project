const express = require('express');
const { check } = require('express-validator');

const  Appointment = require('../models/Appointment');
const appointmentsController = require('../Controller/appointments-controllers');


const router = express.Router();


router.get('/', appointmentsController.getAppointment);
router.get('/:docid', appointmentsController.getbydoc);
router.get('/pati/:patientid', appointmentsController.getbypatient);
router.get('/hos/:hosid', appointmentsController.getbyhospital);
router.get('/doctor/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const appointments = await Appointment.find({ doctor: doctorId }); // Assuming "doctor" is the field in the appointment model
        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching appointments", error });
    }
});
router.post(
 '/',
 appointmentsController.signup
);

router.delete('/:appointmentId', appointmentsController.deleteAppointment);

router.patch('/appo/:appointmentId', appointmentsController.confirmappo);
router.patch('/scheduled/:appointmentId', appointmentsController.scheduled);
router.patch('/:appointmentId', appointmentsController.updateAppointment);

// router.post('/login', usersController.login);


module.exports = router;
