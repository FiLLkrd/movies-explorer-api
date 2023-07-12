const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { PORT, DB_URL } = require('./utils/configuration');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ErrNotFound = require('./utils/ErrNotFound');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use((req, res, next) => {
  next(new ErrNotFound('Страница по данному адресу не найдена'));
});
mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.error(err);
  });
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
