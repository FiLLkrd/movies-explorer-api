const ErrBadRequest = require('../utils/ErrBadRequest');
const { COMMON_ERROR_CODE } = require('../utils/errorsConstants');
const ErrConflictUser = require('../utils/ErrConflictUser');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(ErrBadRequest.statusCode)
      .send({ message: ErrBadRequest.message });
    return;
  }

  if (err.code === 11000) {
    res.status(ErrConflictUser.statusCode).send({
      message: ErrConflictUser.message,
    });
    return;
  }

  const { statusCode = COMMON_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === COMMON_ERROR_CODE
        ? 'Внутренняя ошибка сервера'
        : message,
  });

  next();
};
