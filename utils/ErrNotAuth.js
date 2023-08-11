const { UNAUTHORIZED_ERROR_CODE } = require('./errorsConstants');

class ErrNotAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_ERROR_CODE;
  }
}

module.exports = ErrNotAuth;
