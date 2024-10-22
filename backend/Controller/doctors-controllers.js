const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');
const Notification = require('../models/Notification'); // Import Notification model

const createNotification = async (message) => {
    try {
        const newNotification = new Notification({ message });
        await newNotification.save();
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

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
    res.json({ doctors: doctors.map(doctor => doctor.toObject({ getters: true })) });
};

const getbyId = async (req, res, next) => {
    const userId = req.params.userId;
    const user = new mongoose.Types.ObjectId(userId);
    let doctor;
    try {
        doctor = await Doctor.findOne({ user: user });
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
    if (doctor == null) {
        return next(new HttpError('Could not find user with the provided ID.', 404));
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
            "doctor not found",
            500
        );
        return next(error);
    }

    res.json({ doctor: doctor.map(doctor => doctor.toObject({ getters: true })) });
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
    const { docName, docEmail, docContact, user , hospital} = req.body;

    let existingDoctor;
    try {
        existingDoctor = await Doctor.findOne({ docEmail: docEmail });
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
        hospital
    });

    try {
        await createdDoctor.save();
        await createNotification(`New doctor ${docName} has been added.`); // Create a notification
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({ doctor: createdDoctor.toObject({ getters: true }) });
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
        await createNotification(`Doctor ${doctor.docName} has been deleted.`); // Create a notification
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
    console.log("Updating doctor profile...");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { docName, docEmail, docContact, docGender, docSpeciality, DOB, docAddress, imageUrl ,docQualification} = req.body;
    const doctorId = req.params.doctorId;

    let doctor;  // Change from const to let
    try {
        doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return next(new HttpError('Could not find doctor for the provided ID.', 404));
        }

        // Update doctor fields
        doctor.docName = docName;
        doctor.docEmail = docEmail;
        doctor.docContact = docContact;
        doctor.docGender = docGender;
        doctor.docSpeciality = docSpeciality;
        doctor.docAddress = docAddress;  // Update address fields
        doctor.docQualification = docQualification;
        // Only update DOB if it's provided, otherwise retain the existing DOB
        if (DOB) {
            doctor.DOB = String(DOB);
        }

        doctor.imageUrl = imageUrl;

        await doctor.save();
    } catch (err) {
        console.error('Error updating doctor profile:', err);
        return next(new HttpError('Something went wrong, could not update doctor profile.', 500));
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
