const { Unauthenticated, Unauthorized } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new Unauthenticated('Authentication invalid');
    }

    const payload = isTokenValid({ token });

    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      organizer: payload.organizer,
      name: payload.name,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const authenticateParticipant = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      throw new Unauthenticated('Authentication invalid');
    }

    const payload = isTokenValid({ token });

    req.participant = {
      id: payload.participantId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Unauthorized('You are not authorized to perform this action');
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authenticateParticipant,
  authorizeRoles,
};
