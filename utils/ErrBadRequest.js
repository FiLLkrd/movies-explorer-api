const { VALIDATION_ERROR_CODE } = require('./errorsConstants');

class ErrBadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = VALIDATION_ERROR_CODE;
  }
}

module.exports = ErrBadRequest;
