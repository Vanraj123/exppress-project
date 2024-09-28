const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  admin: { type: mongoose.Types.ObjectId, ref: 'Admin' } // Reference to Admin
}, { collection: 'User' });

userSchema.plugin(uniqueValidator); // Ensure unique fields like email if added in the future

module.exports = mongoose.model('User', userSchema);
