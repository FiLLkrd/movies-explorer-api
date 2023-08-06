const router = require('express').Router();
const { deleteMovieValidation, postMovieValidation } = require('../middlewares/validation');
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', postMovieValidation, createMovies);
router.delete('/', deleteMovieValidation, deleteMovies);

module.exports = router;
