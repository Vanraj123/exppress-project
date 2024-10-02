const mongoose = require('mongoose');


const Schema = mongoose.Schema;




const hospitalSchema = new Schema({
   Hos_Name: { type: String, required: true },
   E_Date : { type: Date, required: true },
   ManageBy: { type: String, required: true },
   hosaddress: {
        cityvillage:{ type: String, required: true },
        pincode:{ type: Number, required: true },
        state:{ type: String, required: true },
        country:{ type: String, required: true },
        streetOrSociety:{ type: String, required: true },
    }
   
},{ collection: 'Hospital' });


module.exports = mongoose.model('Hospital', hospitalSchema);  