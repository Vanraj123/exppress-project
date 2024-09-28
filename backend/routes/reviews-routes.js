const express = require('express');
const { check } = require('express-validator');


const reviewsController = require('../Controller/reviews-controllers');


const router = express.Router();


router.get('/', reviewsController.getReview);


router.post(
 '/',
 reviewsController.signup
);

// DELETE a review by ID
router.delete('/:reviewId', reviewsController.deleteReview);

// PATCH to update a review by ID
router.patch('/:reviewId', reviewsController.updateReview);

// router.post('/login', usersController.login);


module.exports = router;
