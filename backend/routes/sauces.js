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

// get one sauce 
router.get('/:id', auth, saucesController.getOneSauce);

// create new sauce 
router.post('/', auth, multer, saucesController.createSauce);

// like / dislike sauce
router.post('/:id/like', auth, saucesController.likeDislike);

// delete sauce 
router.delete('/:id', auth, saucesController.deleteSauce);

// update sauce 
router.put('/:id', auth, saucesController.updateSauce);



// export
module.exports = router;