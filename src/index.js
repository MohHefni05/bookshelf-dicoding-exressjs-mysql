require('dotenv').config();
const express = require('express');

const books = require('./routes/books');
const middlewareLogRequest = require('./middleware/log');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/books', books);

app.listen(PORT, () => {
  console.log(`Server berjalan pada port : ${PORT}`);
});
