const CustomAPIError = require('./custom-api-error');
const BadRequest = require('./bad-request');
const NotFound = require('./not-found');
const Unauthorized = require('./unauthorized');
const Unauthenticated = require('./unauthenticated');

module.exports = {
  CustomAPIError,
  BadRequest,
  NotFound,
  Unauthorized,
  Unauthenticated,
};
