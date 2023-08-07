const router = require('express').Router();
const { updateUserValidate } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.use(auth);
router.get('/me', getUserInfo);
router.patch('/me', updateUserValidate, updateUserInfo);

module.exports = router;
