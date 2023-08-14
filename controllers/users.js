const bcrypt = require('bcrypt');
const User = require('../models/users');
const ErrBadRequest = require('../utils/ErrBadRequest');
const ErrConflictUser = require('../utils/ErrConflictUser');
const ErrNotFound = require('../utils/ErrNotFound');

const { CREATED } = require('../utils/errors');

function createUser(req, res, next) {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(() => res.status(CREATED).send({ message: 'Пользователь создан' }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ErrConflictUser('Пользователь с данным e-mail уже существует'));
      } else if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Данные не корректны'));
      } else {
        next(error);
      }
    });
}

function getUserInfo(req, res, next) {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        throw new ErrNotFound('Страница не найдена');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new ErrConflictUser('Пользователь с данным e-mail уже существует'));
      } else if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Данные не корректны'));
      } else {
        next(error);
      }
    });
}

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new ErrNotFound('Пользователь не найден');
    })
    .then((user) => {
      res.status(CREATED).send({ email: user.email, name: user.name });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
};
