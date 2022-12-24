const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 3 characters'],
      maxLength: [50, 'Name must be less than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['admin', 'organizer', 'owner'],
      default: 'admin',
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: [true, 'Organizer is required'],
    },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }
  next();
});

usersSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model('User', usersSchema);
