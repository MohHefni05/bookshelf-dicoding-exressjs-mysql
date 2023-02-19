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

const getBookById = async (req, res) => {
  const { idBook } = req.params;
  try {
    const [data] = await bookModels.getBookById(idBook);
    if (data.length > 0) {
      return res.json({
        message: 'Mengambil Buku sukses',
        data: data,
      });
    }
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal mendapatkan buku',
      serverMessage: error,
    });
  }
};

const updateBookById = async (req, res) => {
  const { idBook } = req.params;
  const { body } = req;
  const finished = body.pageCount === body.readPage;
  const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    const [data] = await bookModels.getBookById(idBook);
    if (data.length > 0) {
      if (body.name === undefined) {
        return res.status(400).json({
          status: 'fail',
          message: 'Gagal mengubah buku buku. Mohon isi nama buku',
        });
      }

      if (body.readPage > body.pageCount) {
        return res.status(400).json({
          status: 'fail',
          message:
            'Gagal mengubah buku. readPage tidak boleh lebih besar dari pageCount',
        });
      }
      await bookModels.updateBookById(idBook, body, finished, updatedAt);
      return res.status(201).json({
        message: 'Sukses mengubah buku',
        data: {
          id: idBook,
        },
      });
    }
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal mengubah buku',
      serverMessage: error,
    });
  }
};

const deleteBookById = async (req, res) => {
  const { idBook } = req.params;
  try {
    const [data] = await bookModels.getBookById(idBook);
    if (data.length > 0) {
      await bookModels.deleteBookById(idBook);
      return res.status(201).json({
        message: 'Sukses menghapus buku',
        data: {
          id: idBook,
        },
      });
    }
    return res.status(404).json({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Gagal menghapus buku',
      serverMessage: error,
    });
  }
};
module.exports = {
  getAllBooks,
  createNewBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
