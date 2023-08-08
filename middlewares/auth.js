const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/configuration');
const ErrNotAuth = require('../utils/ErrNotAuth');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('bearer ')) {
    next(new ErrNotAuth('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    next(new ErrNotAuth('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
