const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const patientSchema = new Schema({
   patientName: { type: String },
   patientEmail: { type: String },
   patientContact: { type: String },
   patientGender: { type: String },
   address:{
    cityvillage:{ type: String },
    pincode:{ type: Number },
    state:{ type: String },
    country:{ type: String},
    streerorsocity:{ type: String },
    },
   user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
},{ collection: 'Patient' });


module.exports = mongoose.model('Patient', patientSchema);  