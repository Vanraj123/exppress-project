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
    return next(new HttpError('Fetching admins failed, please try again later.', 500));
  }
  res.json({ admins: admins.map(admin => admin.toObject({ getters: true })) });
};

const getId = async (req, res, next) => {
  const userId = req.params.adminid;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new HttpError('Invalid admin ID format.', 400));
  }

  let admin;
  try {
    admin = await Admin.findOne({ user: userId });
    if (!admin) {
      return next(new HttpError('Could not find user with the provided ID.', 404));
    }
  } catch (err) {
    return next(new HttpError('Fetching users failed, please try again later.', 500));
  }

  res.status(200).json({ admin: admin.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { adminName, adminEmail, adminContact, adminAddress, user } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ user });
    if (existingAdmin) {
      return next(new HttpError('User exists already, please login instead.', 422));
    }
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  const createdAdmin = new Admin({
    adminName,
    adminEmail,
    adminContact,
    adminAddress,
    user,
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again.', 500));
  }

  res.status(201).json({ admin: createdAdmin.toObject({ getters: true }) });
};

const deleteAdmin = async (req, res, next) => {
  const adminId = req.params.adminId;

  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return next(new HttpError('Invalid admin ID format.', 400));
  }

  let admin;
  try {
    admin = await Admin.findById(adminId).populate('user');
    if (!admin) {
      return next(new HttpError('Could not find admin for this id.', 404));
    }

    if (admin.user) {
      await User.findByIdAndDelete(admin.user); // Remove associated user
    }
    
    await admin.deleteOne(); // Delete admin document
  } catch (err) {
    return next(new HttpError('Deleting admin failed, please try again.', 500));
  }

  res.status(200).json({ message: 'Deleted admin and associated user.' });
};

const updateAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { adminName, adminEmail, adminContact, adminAddress } = req.body;
  const adminId = req.params.adminId;

  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return next(new HttpError('Invalid admin ID format.', 400));
  }

  let admin;
  try {
    admin = await Admin.findById(adminId);
    if (!admin) {
      return next(new HttpError('Could not find admin for this id.', 404));
    }

    admin.adminName = adminName;
    admin.adminEmail = adminEmail;
    admin.adminContact = adminContact;
    admin.adminAddress = adminAddress;

    await admin.save();
  } catch (err) {
    return next(new HttpError('Something went wrong, could not update admin.', 500));
  }

  res.status(200).json({ admin: admin.toObject({ getters: true }) });
};

const matrics = async (req, res, next) => {
  try {
    const [totalDoctors, totalPatients, totalHospitals, totalReceptionists] = await Promise.all([
      Doctor.countDocuments(),
      Patient.countDocuments(),
      Hospital.countDocuments(),
      Receptionist.countDocuments(),
    ]);

    res.json({ totalDoctors, totalPatients, totalHospitals, totalReceptionists });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch metrics.', error: error.message });
  }
};

const notification = (req, res, next) => {
  const notifications = [
    'New patient registration pending approval.',
    'Doctor Dr. Smith has updated their availability.',
    'Hospital City Hospital has added new services.',
    'Reminder: Monthly staff meeting on Friday.',
  ];

  res.json({ notifications });
};

exports.getAdmin = getAdmin;
exports.getId = getId;
exports.signup = signup;
exports.deleteAdmin = deleteAdmin;
exports.updateAdmin = updateAdmin;
exports.matrics = matrics;
exports.notification = notification;
