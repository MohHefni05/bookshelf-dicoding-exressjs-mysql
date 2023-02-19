require('dotenv').config();
const express = require('express');

const books = require('./routes/books');
const middlewareLogRequest = require('./middleware/log');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(middlewareLogRequest);
app.use(express.json());
// Menetapkan direktori statis untuk gambar
app.use('/images', express.static('public/images'));

// Middleware notFoundHandler untuk menangani gambar yang tidak ada
app.use('/images', (req, res, next) => {
  const err = new Error('Gambar tidak ditemukan');
  err.status = 404;
  res.status(err.status);
  res.send({
    error: {
      message: err.message,
    },
  });
  next();
});

app.use('/books', books);

app.listen(PORT, () => {
  console.log(`Server berjalan pada port : ${PORT}`);
});
