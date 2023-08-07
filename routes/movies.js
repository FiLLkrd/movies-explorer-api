const router = require('express').Router();
const { deleteMovieValidation, postMovieValidation } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.use(auth);
router.get('/', getMovies);
router.post('/', postMovieValidation, createMovies);
router.delete('/', deleteMovieValidation, deleteMovies);

module.exports = router;
