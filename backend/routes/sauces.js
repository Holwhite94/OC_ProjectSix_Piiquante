//import express
const express = require('express');

// import auth
const auth = require('../middleware/auth');

// import multer
const multer = require('../middleware/multer-config');

// create new router object
const router = express.Router();

// import sauce controller
const saucesController = require('../controllers/sauces'); 

// get all sauces 
router.get('/', auth, saucesController.getAllSauces);

// create new sauce 
router.post('/', auth, mutler,saucesController.createSauce);

// export
module.exports = router;