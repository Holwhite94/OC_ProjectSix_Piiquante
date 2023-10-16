//import express
const express = require('express');

// create new router object
const router = express.Router();

// import user controller 
const userCtrl = require('../controllers/user'); 

//create post route for sign up
router.post('/signup', userCtrl.signup);

// create post route for login 
router.post('/login', userCtrl.login);

// export the router 
module.exports = router; 