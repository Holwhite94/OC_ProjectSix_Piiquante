// NEXT:
// GET all sauces 
// Create new sauce + images thing 

// NEW MEETING TO DISCUSS LIKE / DISLIKE  but try do that first :) 

//import sauce model
const Sauce = require('../models/sauces');

// import multer
const multer = require('multer');

// get all sauces 

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(
      (sauces) => {
        return res.status(200).json(sauces);
      }
    )
    .catch(
      (error) => {
        return res.status(400).json({
          error: error
        });
      }
    );
  };

// create sauce 
exports.createSauce = (req, res, next) => {
    //string to object
    req.body.sauce = JSON.parse(req.body.sauce);
    //reconstruct url from request = http + :// + localhost:etc.
    const url = req.protocol + '://' + req.get('host');
  
    const newSauce = new Sauce ({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description, 
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.sauce.heat,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        userDisliked:[] ,
    });
// save new sauce + successs message + error handling
newSauce
.save()
.then(() => {
    res.status(201).json({
        message: "New sauce created!",
    });
})
.catch((error) => {
    res.status(400).json({
        error: error,
    });
});
};
