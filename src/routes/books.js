const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  createNewBook,
  getBookById,
  updateBookById,
} = require('../controllers/books');

router.get('/', getAllBooks);
router.post('/', createNewBook);
router.get('/:idBook', getBookById);
router.patch('/:idBook', updateBookById);

module.exports = router;
