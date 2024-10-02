const Notification = require('../models/Notification'); // Adjust the path as necessary
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');


// Controller method to create a new notification
    const createNotification = async (req, res) => {
        const { message } = req.body; // Assume the message is sent in the request body

        try {
            const newNotification = new Notification({ message });
            await newNotification.save(); // Save the notification to the database
            res.status(201).json(newNotification); // Respond with the created notification
        } catch (error) {
            console.error('Error creating notification:', error);
            res.status(500).json({ message: 'Failed to create notification.', error: error.message });
        }
    };
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find(); // Fetch all notifications from the database
        res.status(200).json(notifications); // Respond with the list of notifications
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Failed to fetch notifications.', error: error.message });
    }
};

exports.getNotifications = getNotifications;
exports.createNotification =createNotification;