const express = require('express');
const { check } = require('express-validator');


const adminsController = require('../Controller/admins-controllers');


const router = express.Router();


router.get('/', adminsController.getAdmin);


router.post(
 '/',
 adminsController.signup
);


// DELETE
router.delete('/:adminId', adminsController.deleteAdmin);

// UPDATE
router.patch('/:adminId', adminsController.updateAdmin);


// router.post('/login', usersController.login);


module.exports = router;
