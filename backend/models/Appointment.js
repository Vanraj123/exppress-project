const mongoose = require('mongoose');


const Schema = mongoose.Schema;

   


const appointment = new Schema({
   patient: { type: mongoose.Types.ObjectId,  ref: 'Patient' },
   doctor: { type: mongoose.Types.ObjectId, ref: 'Doctor' },
   hospital: { type: mongoose.Types.ObjectId,  ref: 'Hospital' },
   status: { type: String},
   date: { type: Date },  // Add date field
   time: { type: String }  // Add time field, could be a string or Date object
}, { collection: 'Appointment' });


module.exports = mongoose.model('Appointment',appointment );
