const express = require('express');
const router = express.Router();
const { getAllBooks, createNewBook } = require('../controllers/books');

router.get('/', getAllBooks);
router.post('/', createNewBook);

module.exports = router;
