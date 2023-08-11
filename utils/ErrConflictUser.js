const { CONFLICT_ERROR_CODE } = require('./errorsConstants');

class ErrConflictUser extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

module.exports = ErrConflictUser;
