const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ErrNotFound = require('../utils/ErrNotFound');
const ErrConflictUser = require('../utils/ErrConflictUser');
const ErrBadRequest = require('../utils/ErrBadRequest');
const ErrNotAuth = require('../utils/ErrNotAuth');
const { JWT_SECRET } = require('../utils/configuration');
const CREATED = require('../utils/errors');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new ErrNotFound('Данный пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        throw new ErrNotFound('Данный пользователь не найден');
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new ErrConflictUser('Аккаунт с данным email уже зарегистрирован'));
      } else if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(() => res.status(CREATED).send({ message: 'Пользователь создан' }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ErrConflictUser('Аккаунт с данным email уже зарегистрирован'));
      } else if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => { throw new ErrNotAuth('Неверные почта или пароль'); })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw ErrNotAuth('Неверные почта или пароль');
        }
        return user;
      }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
