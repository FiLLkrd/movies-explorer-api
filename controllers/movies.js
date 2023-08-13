const Movie = require('../models/movies');
const ErrForBidden = require('../utils/ErrForBidden');
const ErrNotFound = require('../utils/ErrNotFound');
const { CREATED, OK } = require('../utils/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch((err) => next(err));
};

const createMovies = (req, res) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATED).send(movie);
    })
    .catch((err) => console.log(err));
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new ErrNotFound('Фильм с указанным id не найден');
    })
    .then((movie) => {
      if (`${movie.owner}` !== req.user._id) {
        throw new ErrForBidden(
          'Недостаточно прав для удаления чужого фильма',
        );
      }
      Movie.findByIdAndRemove(req.params._id)
        .orFail(() => {
          throw new ErrNotFound('Фильм с указанным id не найден');
        })
        .then(() => {
          res.send({ message: 'фильм успешно удален' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
