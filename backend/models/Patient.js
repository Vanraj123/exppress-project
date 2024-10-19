const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const patientSchema = new Schema({
   patientName: { type: String },
   patientEmail: { type: String },
   patientContact: { type: String },
   patientGender: { type: String },
   patientAddress:{
    cityvillage:{ type: String },
    pincode:{ type: String },
    state:{ type: String },
    country:{ type: String},
    streerorsocity:{ type: String },
    },
    DOB: { type: String },
   user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
},{ collection: 'Patient' });


module.exports = mongoose.model('Patient', patientSchema);  