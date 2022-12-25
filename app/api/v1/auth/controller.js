const { login } = require('../../../services/mongoose/auth');

const { StatusCodes } = require('http-status-codes');

const signIn = async (req, res, next) => {
  try {
    const result = await login(req);
    res.status(StatusCodes.OK).json({ data: { token: result } });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signIn,
};
