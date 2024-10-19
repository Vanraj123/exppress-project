const express = require('express');
const adminsController = require('../Controller/admins-controllers');

const router = express.Router();

// Static routes should come first
router.get('/metrics', adminsController.matrics);
router.get('/notifications', adminsController.notification);

// Dynamic routes
router.get('/:adminid', adminsController.getId);
router.get('/', adminsController.getAdmin);

// Signup route
router.post('/', adminsController.signup);

// DELETE
router.delete('/:adminId', adminsController.deleteAdmin);

// UPDATE
router.patch('/:adminId', adminsController.updateAdmin);

module.exports = router;
