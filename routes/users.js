const router = require('express').Router();
const { updateUserValidate } = require('../middlewares/validation');

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', updateUserValidate, updateUserInfo);

module.exports = router;
