const { NOT_FOUND_ERROR_CODE } = require('./errorsConstants');

class ErrNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = ErrNotFound;
