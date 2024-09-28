
const { validationResult } = require('express-validator');


const HttpError = require('../models/http-error');
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');


const getDoctor = async (req, res, next) => {
 let doctors;
 try {
   doctors = await Doctor.find();
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
   return next(error);
 }
 res.json({doctors: doctors.map(doctor => doctor.toObject({ getters: true }))});
};

const getbyId = async (req, res, next) => {
  const userId = req.params.userId;
  const user = new mongoose.Types.ObjectId(userId);
  let doctor;
  try {
    doctor = await Doctor.findOne({ user: user })
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
 }
 res.status(200).json({ doctor: doctor.toObject({ getters: true }) });
};

const getbyhos = async (req, res, next) => {
  const hospital = req.params.hosid;

  let doctor;
  try {
    doctor = await Doctor.find({ hospital: hospital });
    if (!doctor) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }
  
  } catch (err) {
    const error = new HttpError(
      // 
      "doctor not found",
      500
    );
    return next(error);
  }

  res.json({doctor: doctor.map(doctor => doctor.toObject({ getters: true }))});
};


const getbydosId = async (req, res, next) => {
  const doctorId = req.params.docid;

  let doctor;
  try {
    doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }
  
  } catch (err) {
    const error = new HttpError(
      // 
      "doctor not found",
      500
    );
    return next(error);
  }

  res.status(200).json({ doctor: doctor.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return next(
     new HttpError('Invalid inputs passed, please check your data.', 422)
   );
 }
 const {docName,docEmail,docContact,user} = req.body;


 let existingDoctor
 try {
   existingDoctor = await Doctor.findOne({ docEmail: docEmail })
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again later.',
     500
   );
   return next(error);
 }

  if (existingDoctor) {
   const error = new HttpError(
     'User exists already, please login instead.',
     422
   );
   return next(error);
 }
  const createdDoctor = new Doctor({
    docName,
    docEmail,
    docContact,
    user,
 });


 try {
   await createdDoctor.save();
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again.',
     500
   );
   return next(error);
 }


 res.status(201).json({doctor: createdDoctor.toObject({ getters: true })});
};

const deleteDoctor = async (req, res, next) => {
  const doctorId = req.params.doctorId;

  let doctor;
  try {
    doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new HttpError('Could not find doctor for this ID.', 404);
      return next(error);
    }
    await doctor.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete doctor.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted doctor.' });
};

const updateDoctor = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { docName, docGender, docSpeciality, docEmail, docContact, docQualification, docQualificationForm, docAddress, user, hospital } = req.body;
  const doctorId = req.params.doctorId;

  let doctor;
  try {
    doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new HttpError('Could not find doctor for this ID.', 404);
      return next(error);
    }

    doctor.docName = docName;
    doctor.docGender = docGender;
    doctor.docSpeciality = docSpeciality;
    doctor.docEmail = docEmail;
    doctor.docContact = docContact;
    doctor.docQualification = docQualification;
    doctor.docQualificationForm = docQualificationForm;
    doctor.docAddress = docAddress;
    doctor.user = user;
    doctor.hospital = hospital;

    await doctor.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update doctor.',
      500
    );
    return next(error);
  }

  res.status(200).json({ doctor: doctor.toObject({ getters: true }) });
};

exports.getDoctors = getDoctor;
exports.signup = signup;
exports.deleteDoctor = deleteDoctor;
exports.updateDoctor = updateDoctor;
exports.getbyId = getbyId;
exports.getbydosId = getbydosId;
exports.getbyhos = getbyhos;
// exports.login = login;
