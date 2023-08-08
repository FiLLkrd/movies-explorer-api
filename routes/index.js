const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const ErrNotFound = require('../utils/ErrNotFound');
const { signUpValidate, signInValidate } = require('../middlewares/validation');

router.post('/signup', signUpValidate, createUser);
router.post('/signin', signInValidate, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new ErrNotFound('Страница не найдена'));
});

module.exports = router;
