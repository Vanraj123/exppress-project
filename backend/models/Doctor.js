const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;




const doctorSchema = new Schema({
    imageUrl: { type: String }, 
   docName: { type: String},
   docGender: { type: String},
   docSpeciality: { type: String },
   docEmail: { type: String  },
   docContact: { type: String},
   docQualification: { type: String},
   docQualificationForm: { type: String },
   DOB: { type: String },
   docAddress: {
    cityOrVillage: { type: String },
    pincode: { type: String },
    state: { type: String},
    country: { type: String},
    streetOrSociety:{ type: String },
   },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    hospital: { type: mongoose.Types.ObjectId, ref: 'Hospital'},
  

}, { collection: 'Doctor' });

doctorSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Doctor', doctorSchema);  