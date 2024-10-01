
const { validationResult } = require('express-validator');


const HttpError = require('../models/http-error');
const Appointment = require('../models/Appointment');


const getAppointment = async (req, res, next) => {
 let appointments;
 try {
    appointments = await Appointment.find();
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
   return next(error);
 }
 res.json({appointments: appointments.map(appointment => appointment.toObject({ getters: true }))});
};

const getbydoc = async (req, res, next) => {
  const docID = req.params.docid;

  let appointment;
  try {
    appointment = await Appointment.find({ doctor: docID });
    if (!appointment) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }
  
  } catch (err) {
    const error = new HttpError(
      // 
      err,
      500
    );
    return next(error);
  }

  res.json({appointment: appointment.map(appointment => appointment.toObject({ getters: true }))});
};

const getbypatient = async (req, res, next) => {
  const patientID = req.params.patientid;

  let appointment;
  try {
    appointment = await Appointment.find({ patient: patientID });
    if (!appointment) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }
  
  } catch (err) {
    const error = new HttpError(
      // 
      err,
      500
    );
    return next(error);
  }

  res.json({appointment: appointment.map(appointment => appointment.toObject({ getters: true }))});
};

const getbyhospital = async (req, res, next) => {
  const hosID = req.params.hosid;

  let appointment;
  try {
    appointment = await Appointment.find({ hospital: hosID });
    if (!appointment) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }
  
  } catch (err) {
    const error = new HttpError(
      // 
      err,
      500
    );
    return next(error);
  }

  res.json({appointment: appointment.map(appointment => appointment.toObject({ getters: true }))});
};


const confirmappo = async (req, res, next) => {

  const appointmentId = req.params.appointmentId;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }

    const status = "Confirmed"
    appointment.status = status;

    await appointment.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update appointment.',
      500
    );
    return next(error);
  }

  res.status(200).json({ appointment: appointment.toObject({ getters: true }) });
};

const scheduled = async (req, res, next) => {

  const appointmentId = req.params.appointmentId;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }

    const status = "Scheduled"
    appointment.status = status;

    await appointment.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update appointment.',
      500
    );
    return next(error);
  }

  res.status(200).json({ appointment: appointment.toObject({ getters: true }) });
};



const signup = async (req, res, next) => {
//  const errors = validationResult(req);
//  if (!errors.isEmpty()) {
//    return next(
//      new HttpError('Invalid inputs passed, please check your data.', 422)
//    );
//  }

 const {patient,doctor,hospital,status,date,time} = req.body;
 
 

  const createdAppointment = new Appointment({
    patient,
    doctor,
    hospital,
    status,
    date,
    time
 });


 try {
   await createdAppointment.save();
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again.',
     500
   );
   return next(error);
 }


 res.status(201).json({appointment: createdAppointment.toObject({ getters: true })});
};


// DELETE
const deleteAppointment = async (req, res, next) => {
  const appointmentId = req.params.appointmentId;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }
    await appointment.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete appointment.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted appointment.' });
};

const updateAppointment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { patient, doctor, hospital, status,date,time } = req.body;
  const appointmentId = req.params.appointmentId;

  let appointment;
  try {
    appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      const error = new HttpError('Could not find appointment for this ID.', 404);
      return next(error);
    }

    appointment.patient = patient;
    appointment.doctor = doctor;
    appointment.hospital = hospital;
    appointment.status = status;
    appointment.date = date;
    appointment.time = time;

    await appointment.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update appointment.',
      500
    );
    return next(error);
  }

  res.status(200).json({ appointment: appointment.toObject({ getters: true }) });
};

exports.getAppointment = getAppointment;
exports.signup = signup;
exports.scheduled = scheduled;
exports.getbydoc = getbydoc;
exports.getbypatient = getbypatient;
exports.getbyhospital = getbyhospital;
exports.deleteAppointment = deleteAppointment;
exports.confirmappo = confirmappo;
exports.updateAppointment = updateAppointment;

// exports.login = login;
