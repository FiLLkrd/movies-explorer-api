const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');
const ErrNotFound = require('../utils/ErrNotFound');
const { signUpValidate, signInValidate } = require('../middlewares/validation');

router.post('/signup', signUpValidate, createUser);
router.post('/signin', signInValidate, login);
router.use('*', (req, res, next) => {
  next(new ErrNotFound('Страница не найдена'));
});

module.exports = router;
