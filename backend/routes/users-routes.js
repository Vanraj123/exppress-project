const express = require('express');
const { check } = require('express-validator');


const usersController = require('../Controller/users-controllers');


const router = express.Router();


router.get('/', usersController.getUsers);


router.post(
 '/signup',
 usersController.signup
);

// POST to log in a user
router.post('/login', usersController.login);

// DELETE a user by ID
router.delete('/:uid', usersController.deleteUser);

// PATCH to update a user by ID
router.patch('/:uid', usersController.updateUser);

module.exports = router;
