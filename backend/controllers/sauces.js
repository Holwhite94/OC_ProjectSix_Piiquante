// NEXT:
// GET all sauces 
// Create new sauce + images thing 

// NEW MEETING TO DISCUSS LIKE / DISLIKE  but try do that first :) 

//import sauce model
const Sauce = require('../models/sauces');

// get all sauces 

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        return res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        return res.status(400).json({
          error: error
        });
      }
    );
  };
