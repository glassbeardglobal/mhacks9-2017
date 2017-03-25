var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String },
  nessieId: { type: String },
  accountId: { type: String }
},{
  minimize: false,
  timestamps: true
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
