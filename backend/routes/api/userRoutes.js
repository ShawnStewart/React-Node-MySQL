const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mysql = require("mysql");

// validation
const validateRegistration = require("../../validation/user/registration");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  console.log(req.app.get("connection"));
  res.json({ msg: "User route working" });
});

// @route   POST api/users/register
// @desc    User Registration
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  // Validation check
  if (!isValid) return res.status(400).json(errors);

  const { first_name, last_name, email } = req.body;
  const connection = req.app.get("connection");

  const SELECT_USERS_BY_EMAIL = `select id from users where email = '${email}'`;
  connection.query(SELECT_USERS_BY_EMAIL, (err, results) => {
    if (err) return res.send(err);
    if (results.length) {
      errors.email = "There is already a user with that email";
      return res.status(400).json(errors);
    }

    bcrypt.genSalt(11, (errors, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(400).json(err);
        const password = hash;
        const INSERT_USER = `insert into users(first_name, last_name, email, password) values('${first_name}', '${last_name}', '${email}', '${password}');`;
        connection.query(INSERT_USER, (err, results) => {
          if (err) return res.send(err);
          return res.json(results);
        });
      });
    });
  });
});

// @route   POST api/users/login
// @desc    User Login
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isvalid } = null;
});

module.exports = router;
