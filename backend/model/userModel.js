const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
