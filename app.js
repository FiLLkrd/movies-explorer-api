const express = require('express');
const mongoose = require('mongoose');
const { PORT, DB_URL } = require('./utils/configuration');
const routes = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(DB_URL)
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
