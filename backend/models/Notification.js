const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the Notification schema
const notificationSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
//    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{ collection: 'Notification' });

// Create the Notification model


module.exports = mongoose.model('Notification', notificationSchema);;
