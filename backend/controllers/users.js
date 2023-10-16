// import bcrypt
const bcrypt = require("bcrypt");

// import user models
const user = require("../models/user");

// import jsonwebtoken
const jwt = require('jsonwebtoken');

// sign up function
exports.signup = (req, res, next) => {
  // hash password from request body
  bcrypt.hash(req.body.password, 10).then((hash) => {
    // create a new user within then block and save
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      // return response if successful
      .then(() => {
        res.status(201).json({
          message: "User successfully created!",
        });
      })
      // return error if not
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

// log in function
exports.login = (req, res, next) => {
  //check to see if user exists already
  User.findOne({ email: res.body.email }).then((user) => {
    if (!user) {
      return res.status(401).json({
        error: new Error("User not found!"),
      });
    }
    // compares password from request body to user password
    bcrypt.compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({
            error: new Error("Password not valid!"),
          });
        }
        // create a token with user ID encoded, secret string and expiry
        const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
        //if user valid return string of user id and token
        res.status(200).json({
          userId: user._id,
          token: token
        });
      })
      // handle sever errors
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};
