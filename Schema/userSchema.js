
const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: [8, "password should not less than 8"],
    },

    firstName: {
      type: String,
      require: true,
    },

    isVerify: {
      type: Boolean,
      default: false
    },

    lastName: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },

);

const userModel = mongoose.model("User", Schema);
module.exports = userModel;
