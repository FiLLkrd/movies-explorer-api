const { PORT = 3004 } = process.env;
const { DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  DB_URL,
};
