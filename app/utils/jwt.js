const jwt = require('jsonwebtoken');

const { jwtSecret, jwtExpiration } = require('../config');
// console.log(5555, jwtSecret, jwtExpiration);

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = {
  createJWT,
  isTokenValid,
};
