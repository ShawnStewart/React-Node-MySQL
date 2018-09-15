const Validator = require("validator");
const checkEmpty = require("../checkEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.first_name = !checkEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !checkEmpty(data.last_name) ? data.last_name : "";
  data.email = !checkEmpty(data.email) ? data.email : "";
  data.password = !checkEmpty(data.password) ? data.password : "";

  // first_name
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name is required";
  } else if (!Validator.isLength(data.first_name, { max: 32 })) {
    errors.first_name = "First name can't be more than 32 characters";
  } else if (!Validator.isAlpha(data.first_name)) {
    errors.first_name = "First name can only be letters";
  }

  // last_name
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name is required";
  } else if (!Validator.isLength(data.last_name, { max: 32 })) {
    errors.last_name = "Last name can't be more than 32 characters";
  } else if (!Validator.isAlpha(data.last_name)) {
    errors.last_name = "Last name can only be letters";
  }

  // email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return { errors, isValid: checkEmpty(errors) };
};
