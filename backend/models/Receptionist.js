const mongoose = require('mongoose');


const Schema = mongoose.Schema;




const  receptionist= new Schema({
   hospital: { type: mongoose.Types.ObjectId,  ref: 'Hospital'},
   receptionistName: {type:String },
   receptionistEmail: { type: String },
   receptionistContact: { type: String},
   gender: { type: String },
   DOB: { type: Date},
   imageUrl: { type: String},
   user: { type: mongoose.Types.ObjectId, ref: 'User'},
   receptionistAddress: {
    cityOrVillage:{ type: String },
       pincode:{ type: Number },
       state:{ type: String },
       country:{ type: String },
       streetOrSociety:{ type: String },
   }
},{ collection: 'Receptionist' });


module.exports = mongoose.model('Receptionist',receptionist );
