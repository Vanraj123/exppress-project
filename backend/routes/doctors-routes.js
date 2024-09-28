const express = require('express');
const { check } = require('express-validator');


const doctorsController = require('../Controller/doctors-controllers');


const router = express.Router();


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
