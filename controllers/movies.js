const Movie = require('../models/movies');
const ErrBadRequest = require('../utils/ErrBadRequest');
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
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new ErrNotFound('Данный фильм не найден');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send({ message: 'Фильм удален' });
          })
          .cath(next);
      } else {
        throw new ErrForBidden('Недостаточно прав для удаления чужого фильма');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrBadRequest('Данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
