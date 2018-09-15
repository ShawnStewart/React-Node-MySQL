const Validator = require("validator");
const checkEmpty = require("../checkEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !checkEmpty(data.email) ? data.email : "";
  data.password = !checkEmpty(data.password) ? data.password : "";

  // email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Enter your email address to log in";
  }

  // password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Please enter your password";
  }

  return { errors, isValid: checkEmpty(errors) };
};
