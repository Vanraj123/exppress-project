const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Doctor = require('../models/Doctor');  
const Patient = require('../models/Patient');
const Hospital = require('../models/Hospital');
const Receptionist = require('../models/Receptionist');
const mongoose = require('mongoose');
const getAdmin = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    const error = new HttpError(
      'Fetching admins failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ admins: admins.map(admin => admin.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  
  const { adminName, adminEmail, adminContact, adminAddress, user } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ user });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingAdmin) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  const createdAdmin = new Admin({
    adminName,
    adminEmail,
    adminContact,
    adminAddress,
    user
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({ admin: createdAdmin.toObject({ getters: true }) });
};

const deleteAdmin = async (req, res, next) => {
  const adminId = req.params.adminId;

  let admin;
  
  try {
    // Find the admin by ID
    admin = await Admin.findById(adminId).populate('user');
    if (!admin) {
      const error = new HttpError('Could not find admin for this id.', 404);
      return next(error);
    }
    const userId = admin.user;
    const objectId = new mongoose.Types.ObjectId(userId);

    userrr = await User.findById(objectId);
    if (userrr) {
      await userrr.deleteOne(); // Remove the associated Admin document
    }
    // Delete the associated user
    // if (admin.user) {
    //   await admin.user.deleteOne(); // Remove the associated user document
    // }

    // Delete the admin document
    await Admin.findByIdAndDelete(adminId);
  } catch (err) {
    const error = new HttpError(
      err,
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted admin and associated user.' });
};

const updateAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { adminName, adminEmail, adminContact, adminAddress } = req.body;
  const adminId = req.params.adminId;

  let admin;
  try {
    admin = await Admin.findById(adminId);
    if (!admin) {
      const error = new HttpError('Could not find admin for this id.', 404);
      return next(error);
    }

    admin.adminName = adminName;
    admin.adminEmail = adminEmail;
    admin.adminContact = adminContact;
    admin.adminAddress = adminAddress;

    await admin.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update admin.',
      500
    );
    return next(error);
  }

  res.status(200).json({ admin: admin.toObject({ getters: true }) });
};

const matrics = async (req, res) => {
  try {
      const [totalDoctors, totalPatients, totalHospitals, totalReceptionists] = await Promise.all([
          Doctor.countDocuments(),
          Patient.countDocuments(),
          Hospital.countDocuments(),
          Receptionist.countDocuments(),
      ]);

      const metrics = { totalDoctors, totalPatients, totalHospitals, totalReceptionists };
      res.json(metrics);

  } catch (error) {
      console.error('Error fetching metrics:', error);  // Log the error for debugging
      res.status(500).json({ message: 'Failed to fetch metrics.', error: error.message });
  }
};




const notification = (req, res) => {
  const notifications = [
      "New patient registration pending approval.",
      "Doctor Dr. Smith has updated their availability.",
      "Hospital City Hospital has added new services.",
      "Reminder: Monthly staff meeting on Friday."
  ];

  res.json({ notifications });
};

exports.getAdmin = getAdmin;
exports.signup = signup;
exports.deleteAdmin = deleteAdmin;
exports.updateAdmin = updateAdmin;
exports.matrics = matrics;
exports.notification = notification;