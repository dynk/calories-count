const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const {UnauthorizedError} = require('../utils/errors');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  credential: {
    type: String,
    enum: ['REGULAR', 'USERADMIN', 'ADMIN'],
    required: true
  },
  password: {
    type: String,
    require: true,
    minlength: 5
  },
  meals: [{
    type: Schema.Types.ObjectId,
    ref: 'Meals'
  }],
  caloriesPerDay:{
    type: Number,
    require: true,
    min:0
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});



UsersSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
  user.tokens.push({access, token});
  return user.save().then(() => token);
};

UsersSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};


UsersSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UsersSchema.statics.findByCredentials = function (email, password) {
  const User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject(new UnauthorizedError('Invalid password or username!'));
    }
    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject(new UnauthorizedError('Invalid password or username!'));
        }
      });
    });
  });
};

UsersSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = {UsersModel};
