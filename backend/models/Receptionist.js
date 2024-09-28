const mongoose = require('mongoose');


const Schema = mongoose.Schema;




const  receptionist= new Schema({
   user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
   hospital: { type: mongoose.Types.ObjectId, required: true, ref: 'Hospital'},
   receptionistContact: { type: String, required: true },
   receptionistEmail: { type: String, required: true },
   receptionistAddress: {
       cityvillage:{ type: String },
       pincode:{ type: Number },
       state:{ type: String },
       country:{ type: String },
       streerorsocity:{ type: String },
   }
},{ collection: 'Receptionist' });


module.exports = mongoose.model('Receptionist',receptionist );
