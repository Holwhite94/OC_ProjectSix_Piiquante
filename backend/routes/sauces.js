//import express
const express = require('express');

// import auth
const auth = require('../middleware/auth');

// create new router object
const router = express.Router();

// import sauce controller
const saucesController = require('../controllers/sauces'); 

// get all sauces 
router.get('/', auth, saucesController.getAllSauces);

// export
module.exports = router;