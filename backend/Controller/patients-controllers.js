
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

const getByAppointment = async (req, res, next) => {
  const appointmentId = req.params.appointmentId;

  try {
      // Find appointment by ID and populate the patient details
      const appointment = await Appointment.findById(appointmentId).populate('patient', 'name');

      if (!appointment) {
          return res.status(404).json({ message: 'Appointment not found' });
      }

      // Return the patient's name from the populated data
      res.json({
          success: true,
          patient: appointment.patient
      });
  } catch (error) {
      return res.status(500).json({ success: false, message: 'Error fetching patient details', error });
  }
};
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
 if(patient== null)
 {
  return next(new HttpError('Could not find user with the provided ID.', 404));
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
 if (!patient) {
  return res.status(404).json({ message: 'Patient not found.' });
}
 res.status(200).json({ patient: patient.toObject({ getters: true }) });
};

const getbydoc = async (req, res, next) => {
  const docId = req.params.docid;
  if (!mongoose.Types.ObjectId.isValid(docId)) {
    return res.status(400).json({ message: 'Invalid doctor ID.' });
  }

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

const getByDoctor = async (req, res, next) => {
  const docId = req.params.docid;

  // Check if the provided docId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(docId)) {
    return res.status(400).json({ message: 'Invalid doctor ID.' });
  }

  const doctor = new mongoose.Types.ObjectId(docId);

  let patients;
  try {
    // Fetch all patients associated with the doctor
    patients = await Patient.find({ doctor: doctor });
    
    // If no patients found
    if (patients.length === 0) {
      return res.status(404).json({ message: 'No patients found for this doctor.' });
    }
  } catch (err) {
    const error = new HttpError(
      'Fetching patients failed, please try again later.',
      500
    );
    return next(error);
  }

  // Return all patients
  res.status(200).json({ patients: patients.map(patient => patient.toObject({ getters: true })) });
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

  const { patientName, patientEmail, patientContact, patientGender, patientAddress, DOB } = req.body;
  const patientId = req.params.patientId;

  let patient;
  try {
    patient = await Patient.findById(patientId);
    if (!patient) {
      const error = new HttpError('Could not find patient for this ID.', 404);
      return next(error);
    }

    // Update patient fields
    patient.patientName = patientName;
    patient.patientEmail = patientEmail;
    patient.patientContact = patientContact;
    patient.patientGender = patientGender;
    patient.DOB = String(DOB); 
    console.log(patient.DOB);
    console.log("hiii");
    console.log(patientAddress);
    // Update patient address
    patient.patientAddress = {
      cityOrVillage: patientAddress.cityOrVillage,
      streetOrSociety: patientAddress.streetOrSociety,
      state: patientAddress.state,
      pincode: patientAddress.pincode,
      country: patientAddress.country
    };
    console.log( patient.patientAddress);

    await patient.save();

  } catch (err) {
    const error = new HttpError('Something went wrong, could not update patient.', 500);
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
exports.getByDoctor = getByDoctor;
exports.getByAppointment =    getByAppointment;


// exports.login = login;
