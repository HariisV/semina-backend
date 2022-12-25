const Users = require('../../api/v1/users/model');

const { BadRequest, Unauthorized } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');

const login = async (req) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequest('Email and password are required');

  const result = await Users.findOne({ email: email });

  if (!result) throw new Unauthorized('Email not found');

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) throw new Unauthorized('Invalid email or password');

  const token = createJWT({ payload: createTokenUser(result) });

  return token;
};

module.exports = { login };
