const jwt = require("jsonwebtoken");

const decodeToken = async (req, res, next) => {
  if (req.headers.token) {
   jwt.verify(token, "testkey");
    console.log(req.headers);
  }

  
};

module.exports = decodeToken;
