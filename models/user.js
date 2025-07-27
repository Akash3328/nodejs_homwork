const mongoose = require("mongoose");

const userSchema = new  mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;