const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const ErrNotFound = require('../utils/ErrNotFound');

router.post('/signup', createUser);
router.post('/signin', login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new ErrNotFound(''));
});

module.exports = router;
