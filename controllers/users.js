const bcrypt = require('bcrypt');
const User = require('../models/users');
const ErrBadRequest = require('../utils/ErrBadRequest');
const ErrConflictUser = require('../utils/ErrConflictUser');
const ErrNotFound = require('../utils/ErrNotFound');

const { CREATED, OK } = require('../utils/errors');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(() => res.status(CREATED).send({ message: 'Пользователь создан' }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ErrConflictUser('Пользователь с данным e-mail уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ErrBadRequest('Данные не корректны'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new ErrNotFound('Данный пользователь не найден');
    })
    .then((user) => {
      res.status(OK).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        throw new ErrNotFound('Данный пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ErrConflictUser('Пользователь с данным e-mail уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ErrBadRequest('Данные не корректны'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
};
