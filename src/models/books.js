const dbPool = require('../config/database');

const getAllBooks = () => {
  const querySQL = `SELECT * FROM books`;
  return dbPool.execute(querySQL);
};

const searchBook = (name = '', finished = '', reading = '') => {
  console.log(name, finished, reading);
  const querySQL = `SELECT * FROM books WHERE name LIKE '%${name}%' AND reading LIKE '%${reading}%' AND finished LIKE '%${finished}%'`;
  return dbPool.execute(querySQL);
};

const createNewBook = (id, body, finished, insertedAt, updatedAt) => {
  const querySQL = `INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt) VALUES ('${id}', '${body.name}', '${body.year}', '${body.author}', '${body.summary}', '${body.publisher}', ${body.pageCount}, ${body.readPage}, ${finished}, ${body.reading}, '${insertedAt}', '${updatedAt}')`;
  return dbPool.execute(querySQL);
};

const getBookById = (idBook) => {
  const querySQL = `SELECT * FROM books WHERE id='${idBook}'`;
  return dbPool.execute(querySQL);
};

const updateBookById = (idBook, body, finished, updatedAt) => {
  const querySQL = `UPDATE books SET name = '${body.name}', year = ${body.year}, author = '${body.author}', summary = '${body.summary}', publisher = '${body.publisher}', pageCount = ${body.pageCount}, readPage = ${body.readPage}, finished = ${finished}, reading = ${body.reading}, updatedAt = '${updatedAt}' WHERE id='${idBook}'`;
  return dbPool.execute(querySQL);
};

const deleteBookById = (idBook) => {
  const querySQL = `DELETE FROM books WHERE id='${idBook}'`;
  return dbPool.execute(querySQL);
};

module.exports = {
  getAllBooks,
  createNewBook,
  searchBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
