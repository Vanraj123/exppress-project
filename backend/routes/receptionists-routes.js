const express = require('express');
const { check } = require('express-validator');


const receptionistsController = require('../Controller/receptionists-controllers');


const router = express.Router();


router.get('/', receptionistsController.getReceptionist);


router.post(
 '/',
 receptionistsController.signup
);


// DELETE a receptionist by ID
router.delete('/:receptionistId', receptionistsController.deleteReceptionist);

// PATCH to update a receptionist by ID
router.patch('/:receptionistId', receptionistsController.updateReceptionist);

// router.post('/login', usersController.login);


module.exports = router;
