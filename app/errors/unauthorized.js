const { statusCodes } = require('http-status-codes');
const customAPIError = require('./custom-api-error');

class UnauthorizedError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.UNAUTHORIZED;
  }
}
module.exports = UnauthorizedError;
