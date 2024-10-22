const express = require('express');
const { check } = require('express-validator');


const doctorsController = require('../Controller/doctors-controllers');


const router = express.Router();
const Appointment = require('../models/Appointment'); 
const Patient = require('../models/Patient'); 
const mongoose = require('mongoose');
router.get('/:doctorId/patients', async (req, res) => {
    const { doctorId } = req.params; // Correctly destructure doctorId from req.params

    try {
        // Step 1: Convert the doctorId to ObjectId using 'new'
        const objectIdDoctor = new mongoose.Types.ObjectId(doctorId); // Ensure 'new' is used here

        // Step 2: Find all appointments that match the given doctorId
        const appointments = await Appointment.find({ doctor: objectIdDoctor });

        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this doctor' });
        }

        // Step 3: Extract the patient IDs from the appointments
        const patientIds = appointments.map(appointment => appointment.patient);

        // Step 4: Find the patients using the extracted patient IDs
        const patients = await Patient.find({ '_id': { $in: patientIds } });

        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }

        // Step 5: Send the list of patients in the response
        res.status(200).json({ patients });
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/', doctorsController.getDoctors);
router.get('/hos/:hosid', doctorsController.getbyhos);
router.get('/doc/:docid', doctorsController.getbydosId);

router.post(
 '/',
 [],
 doctorsController.signup
);


// router.post('/login', usersController.login);

// DELETE
router.delete('/:doctorId', doctorsController.deleteDoctor);
// UPDATE
router.patch('/:doctorId', doctorsController.updateDoctor);
router.get('/:userId', doctorsController.getbyId);

module.exports = router;
