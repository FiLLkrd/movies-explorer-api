const express = require('express');
const { PORT } = require('./utils/configuration');

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Сервер запущен на ${PORT} порту`);
})