const mongoose = require("mongoose");
const userModel = require("./userSchema");

const OTPSchema = new mongoose.Schema({
  OTP: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel.collection.name,
    required: true,
  },
});

const OTPModel = mongoose.model("OTP", OTPSchema);
module.exports = OTPModel;
