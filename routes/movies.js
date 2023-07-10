const router = require('express').Router();
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovies);
router.delete('/', deleteMovies);

module.exports = router;
