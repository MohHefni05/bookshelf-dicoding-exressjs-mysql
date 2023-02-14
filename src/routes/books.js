const express = require('express');
const router = express.Router();
const { getAllBooks } = require('../controllers/books');

router.get('/', getAllBooks);

module.exports = router;
