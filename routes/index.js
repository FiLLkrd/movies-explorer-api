const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);

module.exports = router;
