const mongoose = require('mongoose');
// create a schema
const sauceSchema = mongoose.Schema({
    userId:{type: String, required: true}, // true = required
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true}, 
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type:[], required: true}, // array of strings - user id's
    usersDisliked:{type:[], required: true},
});


module.exports = mongoose.model('Sauces', sauceSchema); // export model based off sauce schema

