
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');


const getPatient = async (req, res, next) => {
 let patients;
 try {
    patients = await Patient.find();
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
   return next(error);
 }
 res.json({patients: patients.map(patient => patient.toObject({ getters: true }))});
};

const getbyId = async (req, res, next) => {
  const userId = req.params.userId;
  const user = new mongoose.Types.ObjectId(userId);
  let patient;
  try {
    patient = await Patient.findOne({ user: user })
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
 }
 res.status(200).json({ patient: patient.toObject({ getters: true }) });
};

const getbypati = async (req, res, next) => {
  const patientId = req.params.patientid;

  let patient;
  try {
    patient = await Patient.findById(patientId);
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
 }
 res.status(200).json({ patient: patient.toObject({ getters: true }) });
};

const getbydoc = async (req, res, next) => {
  const docId = req.params.docid;
  const doctor = new mongoose.Types.ObjectId(docId);
  
  let patient;
  try {
    patient = await Patient.findOne({ doctor: doctor });
    if (!patient) {
      return res.status(404).json({ message: 'No patient found for this doctor.' });
    }
  } catch (err) {
    const error = new HttpError(
      'Fetching patient failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json({ patient: patient.toObject({ getters: true }) });
};



const signup = async (req, res, next) => {
//  const errors = validationResult(req);
//  if (!errors.isEmpty()) {
//    return next(
//      new HttpError('Invalid inputs passed, please check your data.', 422)
//    );
//  }
 const {patientName,patientEmail,patientContact,user} = req.body;


 let existingPatient
 
 existingPatient = await Patient.findOne({ user: user })
 

  if (existingPatient) {
   const error = new HttpError(
     'User exists already, please login instead.',
     422
   );
   return next(error);
 }
  const createdPatient = new Patient({
    patientName,
    patientEmail,
    patientContact,
    user
 });


 try {
   await createdPatient.save();
 } catch (err) {
   const error = new HttpError(
    //  'Signing up failed, please try again.'
    err,
     500
   );
   return next(error);
 }


 res.status(201).json({patient: createdPatient.toObject({ getters: true })});
};

// DELETE
const deletePatient = async (req, res, next) => {
  const patientId = req.params.patientId;
  const objectId = new mongoose.Types.ObjectId(patientId);

  let patient;
  let appointment;
  try {
    patient = await Patient.findById(patientId);
    appointment =  await Appointment.findOne({ user: objectId });
    // Delete the associated admin if it exists
    if (appointment) {
      await appointment.deleteOne(); // Remove the associated Admin document
    }
    if (!patient) {
      const error = new HttpError('Could not find patient for this ID.', 404);
      return next(error);
    }
    await patient.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete patient.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted patient.' });
};

const updatePatient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { patientName, patientEmail, patientContact, patientGender, address } = req.body;
  const patientId = req.params.patientId;

  let patient;
  try {
    patient = await Patient.findById(patientId);
    if (!patient) {
      const error = new HttpError('Could not find patient for this ID.', 404);
      return next(error);
    }

    patient.patientName = patientName;
    patient.patientEmail = patientEmail;
    patient.patientContact = patientContact;
    patient.patientGender = patientGender;
    patient.address = address;

    await patient.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update patient.',
      500
    );
    return next(error);
  }

  res.status(200).json({ patient: patient.toObject({ getters: true }) });
};

exports.getPatient = getPatient;
exports.signup = signup;
exports.deletePatient = deletePatient;
exports.updatePatient = updatePatient;
exports.getbyId = getbyId;
exports.getbypati = getbypati;
exports.getbydoc = getbydoc;

// exports.login = login;
