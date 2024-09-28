
const { validationResult } = require('express-validator');


const HttpError = require('../models/http-error');
const Hospital = require('../models/Hospital');


const getHospital = async (req, res, next) => {
 let hospitals;
 try {
    hospitals = await Hospital.find();
 } catch (err) {
   const error = new HttpError(
     'Fetching users failed, please try again later.',
     500
   );
   return next(error);
 }
 res.json({hospitals: hospitals.map(hospital => hospital.toObject({ getters: true }))});
};


const signup = async (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return next(
     new HttpError('Invalid inputs passed, please check your data.', 422)
   );
 }
 const {Hos_Name,E_Date,ManageBy,hosaddress} = req.body;


 let existingHospital
 try {
    existingHospital = await Hospital.findOne({ Hos_Name: Hos_Name })
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again later.',
     500
   );
   return next(error);
 }

  if (existingHospital) {
   const error = new HttpError(
     'User exists already, please login instead.',
     422
   );
   return next(error);
 }
  const createdHospital = new Hospital({
    Hos_Name,
    E_Date,
    ManageBy,
    hosaddress
 });


 try {
   await createdHospital.save();
 } catch (err) {
   const error = new HttpError(
     'Signing up failed, please try again.',
     500
   );
   return next(error);
 }


 res.status(201).json({hospital: createdHospital.toObject({ getters: true })});
};

// DELETE
const deleteHospital = async (req, res, next) => {
  const hospitalId = req.params.hospitalId;

  let hospital;
  try {
    hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      const error = new HttpError('Could not find hospital for this ID.', 404);
      return next(error);
    }
    await hospital.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete hospital.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted hospital.' });
};

// UPDATE
const updateHospital = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { Hos_Name, E_Date, ManageBy, hosaddress } = req.body;
  const hospitalId = req.params.hospitalId;

  let hospital;
  try {
    hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      const error = new HttpError('Could not find hospital for this ID.', 404);
      return next(error);
    }

    hospital.Hos_Name = Hos_Name;
    hospital.E_Date = E_Date;
    hospital.ManageBy = ManageBy;
    hospital.hosaddress = hosaddress;

    await hospital.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update hospital.',
      500
    );
    return next(error);
  }

  res.status(200).json({ hospital: hospital.toObject({ getters: true }) });
};

exports.getHospital = getHospital;
exports.signup = signup;
exports.deleteHospital = deleteHospital;
exports.updateHospital = updateHospital;