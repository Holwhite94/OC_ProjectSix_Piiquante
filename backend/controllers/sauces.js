

//import sauce model
const Sauce = require('../models/sauces');

// import multer
const multer = require('multer');

//import fs
const fs = require('fs');

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
  
// find one sauce 

exports.getOneSauce = (req, res, next) => {
    // find one sauce with request sauce id
    Sauce.findOne({_id: req.params.id,})
      .then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    )
    .catch(
      (error) => {
        res.status(400).json({
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

// like dislike 

exports.likeDislike = (req, res, next) => {
    Sauce.findOne({_id: req.params.id,}).then(sauce=>{

      // like = 1  user liked 
        if(req.body.like == 1){
          sauce.likes++
          sauce.usersLiked.push(req.body.userId)
          sauce.save().then(()=>{
            res.json({message : "user Liked"})
          })
          
          
        }
        // like = -1 user disliked 
        else if (req.body.like == -1){
          sauce.dislikes++
          sauce.usersDisliked.push(req.body.userId)
          sauce.save().then(()=>{
            res.json({message : "user DisLiked"})
          })
          
        }
        // like = 0  user eather liked or disliked 
        else{
          if(sauce.usersLiked.includes(req.body.userId)){
            sauce.likes--
            sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId),1)
            sauce.save().then(()=>{
              res.json({message : "user unLiked"})
            })
          }
          if(sauce.usersDisliked.includes(req.body.userId)){
            sauce.dislikes--
            sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId),1)
            sauce.save().then(()=>{
              res.json({message : "user unLiked"})
            })
          }
        }
    })
};

// delete sauce 

exports.deleteSauce = (req, res, next) => {
  // find sauce to be deleted
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
     // split url to get filename to be deleted
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink('images/' + filename, () => {
        // delete the sauce
        Sauce.deleteOne({_id: req.params.id})
    .then(() => {
            res.status(200).json({
              message: 'Sauce deleted!'
            });
          })
        .catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      });
    }
  );
};

// update sauce 
exports.updateSauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      likes: 0,
      dislikes: 0,
      mainPepper: req.body.sauce.mainPepper,
      usersLiked: [],
      usersDisliked: [],
      userId: req.body.sauce.userId
    };
  } else {
    sauce = {
      _id: req.params.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      imageUrl: req.body.imageUrl,
      mainPepper: req.body.mainPepper,
      usersLiked: req.body.usersLiked,
      usersDisliked: req.body.usersDisliked,
      userId: req.body.userId
    };
  }

  Sauce.updateOne({ _id: req.params.id }, sauce).then(
    () => {
      res.status(201).json({
        message: "Sauce updated successfully"
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

