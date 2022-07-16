const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "Name is required"]
  },
  email: {
    type: String, 
    required: [true, "Email is required"], 
    unique: true
  },
  password: {
    type: String, 
    required: [true, "Password is required"],
  },
  mobileNumber: {
    type: String, 
    required: [true, "Mobile Number is required"], 
    unique: true
  },
})

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;