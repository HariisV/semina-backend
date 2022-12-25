const { StatusCodes } = require('http-status-codes');
const customAPIError = require('./custom-api-error');

class unAuthenticated extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = unAuthenticated;
