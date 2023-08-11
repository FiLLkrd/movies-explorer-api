const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ErrNotAuth = require('../utils/ErrNotAuth');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrNotAuth('Передан неверный логин или пароль');
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrNotAuth('Передан неверный логин или пароль');
          }
          return res.send({
            token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' }),
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports = {
  login,
};
