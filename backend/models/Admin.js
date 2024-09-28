const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  adminName: { type: String, required: true },
  adminEmail: { type: String, required: true },
  adminContact: { type: String, required: true },
  adminAddress: {
    cityVillage: { type: String, required: true },
    pincode: { type: Number, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    streetOrSociety: { type: String, required: true },
  },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
}, { collection: 'Admin' });

// Middleware to delete associated user when an admin is deleted
AdminSchema.pre('findOneAndDelete', async function(next) {
  const admin = await this.model.findOne(this.getFilter());
  if (admin) {
    await User.findByIdAndDelete(admin.user);
  }
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);
