const mongoose = require('mongoose');
// create a schema
const sauceSchema = mongoose.Schema({
    userId:{type: String, required: true}, // true = required
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true}, // do I have to specify here that it will be number between 1-10?
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLikes: {type:["String <userId>"], required: true}, // array of strings - user id's
    usersDisliked:{type:["String <userId>"], required: true},
});


module.exports = mongoose.model('Sauces', sauceSchema); // export model based off sauce schema

// ● userId: String — the MongoDB unique identifier for the user who created
// the sauce.
// ● name: String — name of the sauce.
// ● manufacturer: String — manufacturer of the sauce.
// ● description: String — description of the sauce.
// ● mainPepper: String — the main pepper ingredient in the sauce.
// ● imageUrl: String — the URL for the picture of the sauce uploaded by the
// user.
// ● heat: Number — a number between 1 and 10 describing the sauce.
// ● likes: Number — the number of users liking the sauce.
// ● dislikes: Number — the number of users disliking the sauce.
// ● usersLiked: [ “String <userId>” ] — an array of user IDs of those who have
// liked the sauce.
// ● usersDisliked: [ “String <userId>” ] — an array of user IDs of those who have
// disliked the sauce.
