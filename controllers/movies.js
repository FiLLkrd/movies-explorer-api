const Movie = require('../models/movies');
const ErrBadRequest = require('../utils/ErrBadRequest');
const ErrForBidden = require('../utils/ErrForBidden');
const ErrNotFound = require('../utils/ErrNotFound');
const CREATED = require('../utils/errors');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch((error) => next(error));
};

const createMovies = (req, res, next) => {
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
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(CREATED).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
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
          .catch(next);
      } else {
        throw new ErrForBidden('Вы не можете удалить данный фильм');
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
