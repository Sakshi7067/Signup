const Joi = require("joi");

const createUserValidator = Joi.object({
  email: Joi.string().email().required("Please Enter Email"),
  password: Joi.string().required("Please Enter Password"),
  firstName: Joi.string().required("Please Enter firsName"),
  lastName: Joi.string().required("Please Enter lastName"),
});

const validate = (schema) => async (req, res, next) => {
  const validator = schema.validate(req.body);
  if (validator.error){
    res.status(400).json({
    error: validator.error.details
  })
  } else {
    next();
  }
}

const loginValidator = Joi.object({
    email: Joi.string().email().required("Please Enter Email"),
    password: Joi.string().required("Please Enter Password"),
})


module.exports = { createUserValidator, validate, loginValidator };
