const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vivekshrivastava733@gmail.com",
    pass: "soaj xpqi nnyh swuv",
  },
});

const sendMail = async (userEmail, OTP) => {
  try {
    const maildetails = {
      from: "vivekshrivastava733@gmail.com",
      to: userEmail,
      subject: "Testing Mail",
      text: OTP,
    };
   return transporter.sendMail(maildetails);
    
  } catch (error) {
    console.log("OTP error", error);
    return error;
  }
};

module.exports= sendMail;