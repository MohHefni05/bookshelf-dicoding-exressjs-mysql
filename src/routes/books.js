const { Router } = require('express');
const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  createNewBook,
  getBookById,
  updateBookById,
  deleteBookById,
} = require('../controllers/books');

router.get('/', getAllBooks);
router.post('/', createNewBook);
router.get('/:idBook', getBookById);
router.patch('/:idBook', updateBookById);
router.delete('/:idBook', deleteBookById);

module.exports = router;
