// atlas user : Holly password: u9Kv8H8JX2pGLYNo

//imports
const express = require('express'); 
const mongoose = require('mongoose');
const path =require('path');

// route imports
const router = express.Router();
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// create express app
const app = express(); 

// connect to MongoDB
mongoose.set('strictQuery', false);             
mongoose.connect('mongodb+srv://Holly:u9Kv8H8JX2pGLYNo@atlascluster.i20mae8.mongodb.net/?retryWrites=true&w=majority') // is having this hard coded an issue? put in environment variable
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


  
// middleware parse JSON requests
app.use(express.json());

// CORS

app.use((req, res, next) => {
  res.setHeader( 'Access-Control-Allow-Origin', '*');
  res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// register routes 

app.use('/api/auth', userRoutes);

app.use('/api/sauces', saucesRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));




module.exports = app; // export app to use outside file

