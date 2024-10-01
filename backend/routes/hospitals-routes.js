const express = require('express');
const { check } = require('express-validator');


const hospitalsController = require('../Controller/hospitals-controllers');


const router = express.Router();

router.get('/:hospitalId',hospitalsController.getHos_hosId);
router.get('/', hospitalsController.getHospital);


router.post(
 '/',
 hospitalsController.signup
);


// router.post('/login', usersController.login);

router.delete('/:hospitalId', hospitalsController.deleteHospital);

router.patch('/:hospitalId', hospitalsController.updateHospital);

module.exports = router;
