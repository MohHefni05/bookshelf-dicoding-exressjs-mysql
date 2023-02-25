require('dotenv').config();
const express = require('express');

const books = require('./routes/books');
const upload = require('./middleware/multer');
const middlewareLogRequest = require('./middleware/log');
const notFoundHandler = require('../src/middleware/notFoundHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menetapkan direktori statis untuk gambar
app.use('/images', express.static('public/images'));
// Middleware notFoundHandler untuk menangani gambar yang tidak ada
app.use('/images', notFoundHandler);

app.use('/books', upload.single('photo'), books);

app.listen(PORT, () => {
  console.log(`Server berjalan pada port : ${PORT}`);
});
