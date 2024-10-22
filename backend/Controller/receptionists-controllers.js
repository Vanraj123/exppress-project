
const { validationResult } = require('express-validator');
const User = require('../models/User');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Receptionist = require('../models/Receptionist');


const getReceptionist = async (req, res, next) => {
 let receptionists;
 try {
    receptionists = await Receptionist.find();
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
   return next(error);
 }
 res.json({receptionists: receptionists.map(receptionist => receptionist.toObject({ getters: true }))});
};


const getbyuser = async (req, res, next) => {
  const userId = req.params.userid;
  const user = new mongoose.Types.ObjectId(userId);
  let receptionist;
  try {
    receptionist = await Receptionist.findOne({ user: user })
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
 }
 if(receptionist == null)
 {
  return next(new HttpError('Could not find user with the provided ID.', 404));
 }
 res.status(200).json({ receptionist: receptionist.toObject({ getters: true }) });
};

const getbyid = async (req, res, next) => {
  const Id = req.params.id;
  const recep = new mongoose.Types.ObjectId(Id);
  let receptionist;
  try {
    receptionist = await Receptionist.findById(recep);
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
 }
 res.status(200).json({ receptionist: receptionist.toObject({ getters: true }) });
};



const signup = async (req, res, next) => {
  console.log(req.body); // Add this line to log the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { receptionistName, receptionistEmail, receptionistContact, user, hospital } = req.body;

  let existingrec;
  try {
    existingrec = await Receptionist.findOne({ user: user });
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  if (existingrec) {
    return next(new HttpError('User exists already, please login instead.', 422));
  }

  const createdrec = new Receptionist({
    receptionistName,
    receptionistEmail,
    receptionistContact,
    user,
    hospital
  });

  try {
    await createdrec.save();
    // Optionally handle notification creation here
  } catch (err) {
    return next(new HttpError('Creating receptionist failed, please try again.', 500));
  }

  res.status(201).json({ receptionist: createdrec.toObject({ getters: true }) });
};

// DELETE
const deleteReceptionist = async (req, res, next) => {
  const receptionistId = req.params.receptionistId;

  let receptionist;
  try {
    receptionist = await Receptionist.findById(receptionistId);
    if (!receptionist) {
      const error = new HttpError('Could not find receptionist for this ID.', 404);
      return next(error);
    }
    const userId = receptionist.user;
    const objectId = new mongoose.Types.ObjectId(userId);

    userrr = await User.findById(objectId);
    if (userrr) {
      await userrr.deleteOne(); // Remove the associated Admin document
    }
    await receptionist.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete receptionist.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted receptionist.' });
};

const updateReceptionist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const {  receptionistName,receptionistContact,gender,DOB, receptionistEmail, receptionistAddress } = req.body;
  const receptionistId = req.params.receptionistId;

  let receptionist;
  try {
    receptionist = await Receptionist.findById(receptionistId);
    if (!receptionist) {
      const error = new HttpError('Could not find receptionist for this ID.', 404);
      return next(error);
    }

    receptionist.receptionistName = receptionistName;
    receptionist.gender = gender;
    receptionist.DOB = DOB;
    receptionist.receptionistContact = receptionistContact;
    receptionist.receptionistEmail = receptionistEmail;
    receptionist.receptionistAddress = receptionistAddress;

    await receptionist.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update receptionist.',
      500
    );
    return next(error);
  }

  res.status(200).json({ receptionist: receptionist.toObject({ getters: true }) });
};

const getReceptionistById = async (req, res) => {
  try {
    const receptionistId = req.params.recep_id; // match with your route param
    const receptionist = await Receptionist.findById(receptionistId);

    if (!receptionist) {
      return res.status(404).json({ message: 'Receptionist not found' });
    }

    // Return receptionist data with field names matching the frontend
    res.status(200).json({
      receptionist: {
        name: receptionist.receptionistName, // Frontend expects 'name'
        email: receptionist.receptionistEmail, // Frontend expects 'email'
        phone: receptionist.receptionistContact, // Frontend expects 'phone'
        address: receptionist.receptionistAddress, // Frontend expects 'address'
        DOB: receptionist.DOB, // Date of birth
        gender: receptionist.gender, // Gender
        imageUrl: receptionist.imageUrl // Image URL
      }
    });
  } catch (error) {
    console.error('Error fetching receptionist by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getReceptionist = getReceptionist;
exports.signup = signup;
exports.getbyid = getbyid;
exports.getbyuser = getbyuser;
exports.deleteReceptionist = deleteReceptionist;
exports.updateReceptionist = updateReceptionist;
exports.getReceptionistById = getReceptionistById;