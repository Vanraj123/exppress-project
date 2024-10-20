
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

//Update
const updateHospital = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { Hos_Name, E_Date, ManagedBy, hosaddress } = req.body; // Make sure to use ManagedBy
  const hospitalId = req.params.hospitalId;

  // Log incoming data for debugging
  console.log("Incoming data:", req.body);

  // Validate required fields
  if (!ManagedBy) {
    return next(new HttpError('ManageBy is required.', 422));
  }

  let hospital;
  try {
    hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return next(new HttpError('Could not find hospital for this ID.', 404));
    }

    // Ensure E_Date is properly formatted as a Date
    if (E_Date && E_Date['$date']) {
      hospital.E_Date = new Date(E_Date['$date']);
    } else {
      return next(new HttpError('E_Date is required and must be a valid date.', 422));
    }

    if (isNaN(hospital.E_Date)) {
      return next(new HttpError('Invalid date format for E_Date.', 422));
    }

    // Update fields
    hospital.Hos_Name = Hos_Name;
    hospital.ManageBy = ManagedBy; // Ensure this uses ManagedBy
    hospital.hosaddress = hosaddress;

    await hospital.save();
  } catch (err) {
    console.error("Database update error:", err); // Log the error for debugging
    const error = new HttpError('Something went wrong, could not update hospital.', 500);
    return next(error);
  }

  res.status(200).json({ hospital: hospital.toObject({ getters: true }) });
};


const getHos_hosId = async (req, res, next) =>  {
  const { hospitalId } = req.params;

  try {
      const hospital = await Hospital.findById(hospitalId);

      if (!hospital) {
          return res.status(404).json({ message: 'Hospital not found' });
      }

      res.status(200).json(hospital);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching hospital data', error: err.message });
  }
};

exports.getHospital = getHospital;
exports.signup = signup;
exports.deleteHospital = deleteHospital;
exports.updateHospital = updateHospital;
exports.getHos_hosId = getHos_hosId;