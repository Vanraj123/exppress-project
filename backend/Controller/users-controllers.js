
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Patient = require('../models/Patient');
const Receptionist = require('../models/Receptionist');
const Doctor = require('../models/Doctor');

const getUsers = async (req, res, next) => {
 let users;
 try {
   users = await User.find({}, '-password');
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
   return next(error);
 }
 res.json({users: users.map(user => user.toObject({ getters: true }))});
};


const signup = async (req, res, next) => {
 const errors = validationResult(req); 
 if (!errors.isEmpty()) {
   return next(
     new HttpError('Invalid inputs passed, please check your data.', 422)
   );
 }
 const { username, password } = req.body;


 let existingUser
 try {
   existingUser = await User.findOne({ username: username })
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again later.',
     500
   );
   return next(error);
 }
  if (existingUser) {
   const error = new HttpError(
     'User exists already, please login instead.',
     422
   );
   return next(error);
 }
  const createdUser = new User({
   username,
   password,
 });


 try {
   await createdUser.save();
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again.',
     500
   );
   return next(error);
 }


 res.status(201).json({user: createdUser.toObject({ getters: true })});
};


const login = async (req, res, next) => {
 const { username, password } = req.body;


 let existingUser;


 try {
   existingUser = await User.findOne({ username: username })
   console.log("yes");
 } catch (err) {
   const error = new HttpError(
     'Logging in failed, please try again later.',
     500
   );
   return next(error);
 }


 if (!existingUser || existingUser.password !== password) {
   const error = new HttpError(
     'Invalid credentials, could not log you in.',
     401
   );
   return next(error);
 }

 res.json({
  message: "Logged in!",
  user: existingUser.toObject({ getters: true }),
});
 
};


// add
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, password } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find a user for this id.', 404);
    return next(error);
  }

  user.name = name;
  user.password = password;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

// DELETE

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;
  const objectId = new mongoose.Types.ObjectId(userId);

  let user;
  let admin;
  let patient;
  let receptionist;
  let doctor;
  try {
    // Find the user by ID and populate the associated admin
    user = await User.findById(userId).populate("admin");
    if (!user) {
      const error = new HttpError('Could not find a user for this id.', 404);
      return next(error);
    }
    admin =  await Admin.findOne({ user: objectId });
    patient =  await Patient.findOne({ user: objectId });
    receptionist =  await Receptionist.findOne({ user: objectId });
    doctor =  await Doctor.findOne({ user: objectId });
    // Delete the associated admin if it exists
    if (admin) {
      await admin.deleteOne(); // Remove the associated Admin document
    }
    if (patient) {
      await patient.deleteOne(); // Remove the associated Admin document
    }
    if (receptionist) {
      await receptionist.deleteOne(); // Remove the associated Admin document
    }
    if (doctor) {
      await doctor.deleteOne(); // Remove the associated Admin document
    }
 
    // Delete the user document
    await user.deleteOne();
  } catch (err) {
    const error = new HttpError(
      // 'Something went wrong, could not delete user.',
      err,
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted user and associated admin.' });
};
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;