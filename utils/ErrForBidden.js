const { FORBIDDEN_ERROR_CODE } = require('./errorsConstants');

class ErrForBidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = ErrForBidden;
