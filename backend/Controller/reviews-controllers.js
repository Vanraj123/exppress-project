
const { validationResult } = require('express-validator');


const HttpError = require('../models/http-error');
const Review = require('../models/Review');


const getReview = async (req, res, next) => {
 let reviews;
 try {
    reviews = await Review.find();
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
   return next(error);
 }
 res.json({reviews: reviews.map(review => review.toObject({ getters: true }))});
};


const signup = async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return next(
     new HttpError('Invalid inputs passed, please check your data.', 422)
   );
 }
 const {feedback,dateTime,user} = req.body;


 let existingReview
 try {
    existingReview = await Review.findOne({ user: user })
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again later.',
     500
   );
   return next(error);
 }

  if (existingReview) {
   const error = new HttpError(
     'User exists already, please login instead.',
     422
   );
   return next(error);
 }
  const createdReview = new Review({
    feedback,
    dateTime,
    user
 });


 try {
   await createdReview.save();
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again.',
     500
   );
   return next(error);
 }


 res.status(201).json({review: createdReview.toObject({ getters: true })});
};

const deleteReview = async (req, res, next) => {
  const reviewId = req.params.reviewId;

  let review;
  try {
    review = await Review.findById(reviewId);
    if (!review) {
      const error = new HttpError('Could not find review for this ID.', 404);
      return next(error);
    }
    await review.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete review.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted review.' });
};

const updateReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { feedback, dateTime } = req.body;
  const reviewId = req.params.reviewId;

  let review;
  try {
    review = await Review.findById(reviewId);
    if (!review) {
      const error = new HttpError('Could not find review for this ID.', 404);
      return next(error);
    }

    review.feedback = feedback;
    review.dateTime = dateTime;

    await review.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update review.',
      500
    );
    return next(error);
  }

  res.status(200).json({ review: review.toObject({ getters: true }) });
};

exports.getReview = getReview;
exports.signup = signup;
exports.deleteReview = deleteReview;
exports.updateReview = updateReview;

// exports.login = login;
