const express = require('express');
const { check } = require('express-validator');
const Hospital = require('../models/Hospital');

const hospitalsController = require('../Controller/hospitals-controllers');


const router = express.Router();

router.get('/:hospitalId',hospitalsController.getHos_hosId);
router.get('/', hospitalsController.getHospital);


// router.post(
//  '/',
//  hospitalsController.signup
// );

router.post('/', async (req, res) => {
    try {
        const newHospital = new Hospital(req.body);
        const savedHospital = await newHospital.save();
        res.status(201).json({ hospital: savedHospital });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// router.post('/login', usersController.login);

router.delete('/:hospitalId', hospitalsController.deleteHospital);

router.patch('/:hospitalId', hospitalsController.updateHospital);
router.put('/:id', async (req, res) => {
    try {
        // Your validation logic here
        // Example: check if all required fields are present
        if (!req.body.Hos_Name || !req.body.E_Date || !req.body.ManageBy) {
            return res.status(422).json({ error: 'All fields are required.' });
        }

        // Proceed with the update logic
        const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHospital) return res.status(404).send('Hospital not found.');
        res.json({ hospital: updatedHospital });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;