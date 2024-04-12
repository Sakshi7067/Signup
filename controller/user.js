const userModel = require("../Schema/userSchema");
const sendMail = require("../utils/sendmail");
const jwt= require("jsonwebtoken")
const OTPModel = require("../Schema/otpSchema");

const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(422).json({
        error: "Email already exist",
      });
    } else {
      const data = await userModel.create({
        email,
        password,
        firstName,
        lastName,
      });
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      sendMail(req.body.email, otp);
      await OTPModel.create({ OTP: otp, userId: data._id });
      return res.status(200).json({
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
    return;
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const userExist = await userModel.findOne({ email, password });
  if (!userExist) {
    return res.status(400).json({
      error: "User doesn't exist",
    });
  } else {
    const token = jwt.sign({
      id: userExist._id
    }, "testkey");

    res.status(200).json({
      message: "Login successfully",
      token,
    });
  }
};

const getAllUserDetails = async (req, res, next) => {
  const getDetails = await userModel.find({});
  res.status(200).json({
    getDetails,
  });
};

const getUserDetail = async (req, res, next) => {
  try {
    const details = await userModel.findById(req.params.id);
    if (details) {
      res.status(200).json({
        details,
      });
    } else {
      res.status(404).json({
        message: "not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
    return;
  }
};

const updateDetails = async (req, res, next) => {
  try {
    const emailExist = await userModel.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(422).json({
        message: "Email already Exist",
      });
    }
    const details = await userModel.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    return res.status(200).json({
      message: "Update successfully",
      details,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
    return;
  }
};

const verifyUser = async (req, res, next) => {
  const isverify = await OTPModel.findOne({
    userId: req.body.userId,
    OTP: req.body.OTP,
  });
  if (isverify) {
    res.status(200).json({
      message: "Email Verified",
    });
  } else {
    res.status(400).json({
      message: "Not Verified",
    })
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUserDetails,
  getUserDetail,
  updateDetails,
  verifyUser,
};
