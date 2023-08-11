const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');
const { signUpValidate, signInValidate } = require('../middlewares/validation');

router.post('/signup', signUpValidate, createUser);
router.post('/signin', signInValidate, login);

module.exports = router;
