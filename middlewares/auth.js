const jwt = require('jsonwebtoken');
const ErrNotAuth = require('../utils/ErrNotAuth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrNotAuth('Необходима авторизациb');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new ErrNotAuth('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
