
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
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return next(
     new HttpError('Invalid inputs passed, please check your data.', 422)
   );
 }
 const {user,hospital,receptionistName,receptionistContact,receptionistEmail,adminAddress} = req.body;


 let existingReceptionist 
 try {
    existingReceptionist = await Receptionist .findOne({ user: user })
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again later.',
     500
   );
   return next(error);
 }

  if (existingReceptionist) {
   const error = new HttpError(
     'User exists already, please login instead.',
     422
   );
   return next(error);
 }
  const createdReceptionist = new Receptionist({
    user,
    hospital,
    receptionistName,
    receptionistContact,
    receptionistEmail,
    adminAddress
 });


 try {
   await createdReceptionist.save();
 } catch (err) {
   const error = new HttpError(
     err,
     500
   );
   return next(error);
 }


 res.status(201).json({receptionist: createdReceptionist.toObject({ getters: true })});
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

  const { user, hospital, receptionistContact, receptionistEmail, adminAddress } = req.body;
  const receptionistId = req.params.receptionistId;

  let receptionist;
  try {
    receptionist = await Receptionist.findById(receptionistId);
    if (!receptionist) {
      const error = new HttpError('Could not find receptionist for this ID.', 404);
      return next(error);
    }

    receptionist.user = user;
    receptionist.hospital = hospital;
    receptionist.receptionistContact = receptionistContact;
    receptionist.receptionistEmail = receptionistEmail;
    receptionist.adminAddress = adminAddress;

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

exports.getReceptionist = getReceptionist;
exports.signup = signup;
exports.getbyid = getbyid;
exports.getbyuser = getbyuser;
exports.deleteReceptionist = deleteReceptionist;
exports.updateReceptionist = updateReceptionist;
