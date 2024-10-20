const mongoose = require('mongoose');


const Schema = mongoose.Schema;




const hospitalSchema = new Schema({
   Hos_Name: { type: String},
   E_Date : { type: Date },
   ManageBy: { type: String },
   hosaddress: {
        cityvillage:{ type: String},
        pincode:{ type: Number },
        state:{ type: String },
        country:{ type: String },
        streetOrSociety:{ type: String },
    },
    image: { type: String }
},{ collection: 'Hospital' });


module.exports = mongoose.model('Hospital', hospitalSchema);  