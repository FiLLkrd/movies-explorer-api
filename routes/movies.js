const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { deleteMovieValidation, postMovieValidation } = require('../middlewares/validation');
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.use(auth);
router.get('/', getMovies);
router.post('/', postMovieValidation, createMovies);
router.delete('/:movieId', deleteMovieValidation, deleteMovies);

module.exports = router;
