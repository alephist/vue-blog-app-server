const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Schema = mongoose.Schema;

function validateUser(user) {
  const schema = {
    username: Joi.string()
      .trim()
      .min(5)
      .required(),
    email: Joi.string()
      .trim()
      .email()
      .required(),
    password: Joi.string()
      .trim()
      .min(5)
      .required()
  };

  return Joi.validate(user, schema);
}

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 5,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  }
});

userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ id: this._id, username: this.username }, config.jwtPrivateKey);
};

const User = mongoose.model('User', userSchema);

module.exports.validateUser = validateUser;
module.exports.User = User;
