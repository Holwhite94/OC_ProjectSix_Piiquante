const mongoose = require('mongoose');


// create a schema
const userSchema = mongoose.Schema({
    email:{type: String, required: true},
    password: {type: String, required: true}, // how do I ensure this is unique? use external validator mongoose-unique-validator
 });

 module.exports = mongoose.model('user', userSchema);

// User
// ● email: String — the user's email address [unique].
// ● password: String — hash of the user's password.
