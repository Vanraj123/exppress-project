const mongoose = require('mongoose');


const Schema = mongoose.Schema;




const reviewSchema = new Schema({
   feedback: { type: String, required: true },
   dateTime: { type: Date, required: true },
   
   user: { type: mongoose.Types.ObjectId, required: true, ref: 'User'}
},{ collection: 'Review' });


module.exports = mongoose.model('Review', reviewSchema);  