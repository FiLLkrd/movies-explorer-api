const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { updateUserValidate } = require('../middlewares/validation');
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.use(auth);
router.get('/me', getUserInfo);
router.patch('/me', updateUserValidate, updateUserInfo);

module.exports = router;
