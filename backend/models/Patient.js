const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const patientSchema = new Schema({
   patientName: { type: String },
   patientEmail: { type: String },
   patientContact: { type: String },
   patientGender: { type: String },
   patientAddress:{
   cityOrVillage:{ type: String },
    pincode:{ type: String },
    state:{ type: String },
    country:{ type: String},
    streetOrSociety:{ type: String },
    },
    DOB: { type: Date },
   user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
},{ collection: 'Patient' });


module.exports = mongoose.model('Patient', patientSchema);  