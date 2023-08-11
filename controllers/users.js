const bcrypt = require('bcrypt');
const User = require('../models/users');
const ErrNotFound = require('../utils/ErrNotFound');

const { CREATED, OK } = require('../utils/errors');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.status(CREATED).send({
        name: user.name,
        email: user.email,
      }))
      .catch((err) => next(err));
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
