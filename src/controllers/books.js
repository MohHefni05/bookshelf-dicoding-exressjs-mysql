const bookModels = require('../models/books');
const { nanoid } = require('nanoid');

const getAllBooks = async (req, res) => {
  const { name, finished, reading } = req.query;
  console.log(name, finished, reading);
  try {
    [data] = await bookModels.getAllBooks();
    if (name || finished || reading) {
      [data] = await bookModels.searchBook(name, finished, reading);
    }
    return res.json({
      message: 'Sukses menampilkan semua buku',
      data: data.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal menampilkan semua buku',
      serverMessage: error,
    });
  }
};

const createNewBook = async (req, res) => {
  const { body } = req;
  const id = nanoid(16);
  const finished = body.pageCount === body.readPage;
  const insertedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updatedAt = insertedAt;

  if (body.name === undefined) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (body.readPage > body.pageCount) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }
  try {
    await bookModels.createNewBook(id, body, finished, insertedAt, updatedAt);
    return res.status(201).json({
      message: 'Sukses menambahkan buku',
      data: {
        id: id,
        name: body.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal menambahkan buku',
      serverMessage: error,
    });
  }
};

module.exports = { getAllBooks, createNewBook };
