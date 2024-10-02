const express = require('express');
const router = express.Router();
const { getNotifications, createNotification } = require('../Controller/notification-controllers'); // Adjust path as necessary

// Define routes for notifications
router.get('/', getNotifications); // Get all notifications
router.post('/', createNotification); // Create a new notification

module.exports = router;
