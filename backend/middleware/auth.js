// middleware for authentication token

// import web token
const jwt = require('jsonwebtoken');

//export middleware
module.exports = (req, res, next) => {
// wrap everything in try/ catch block
  try {
    const token = req.headers.authorization.split(' ')[1]; // get the token from header
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // decode the token
    const userId = decodedToken.userId; // extract user ID from token
    if (req.body.userId && req.body.userId !== userId) { // check if valid if not error if valid next
      throw 'Invalid user ID';
    } else {
      next();
    }
  } 
  // error
  catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};