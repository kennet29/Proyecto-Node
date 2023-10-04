// jwt.js

const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    userId: user.id, // Include any user-related data you need
    // Add other claims as needed
  };

  const options = {
    expiresIn: '15m', // Set the token expiration time as needed
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = { generateToken };
