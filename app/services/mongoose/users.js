const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizer/model');
const { BadRequest } = require('../../errors/');

const createOrganizer = async (req) => {
  const { organizer, role, name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequest('Passwords do not match');
  }

  const result = await Organizers.create({ organizer });
  const users = await Users.create({
    name,
    email,
    password,
    organizer: result._id,
    role,
  });

  delete users._doc.password;
  return users;
};

module.exports = {
  createOrganizer,
};
