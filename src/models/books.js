const dbPool = require('../config/database');

const getAllBooks = () => {
  querySQL = `SELECT * FROM books`;
  return dbPool.execute(querySQL);
};

const searchBook = (name = '', finished = '', reading = '') => {
  console.log(name, finished, reading);
  querySQL = `SELECT * FROM books WHERE name LIKE '%${name}%' AND reading LIKE '%${reading}%' AND finished LIKE '%${finished}%'`;
  return dbPool.execute(querySQL);
};

const createNewBook = (id, body, finished, insertedAt, updatedAt) => {
  const querySQL = `INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt) VALUES ('${id}', '${body.name}', '${body.year}', '${body.author}', '${body.summary}', '${body.publisher}', ${body.pageCount}, ${body.readPage}, ${finished}, ${body.reading}, '${insertedAt}', '${updatedAt}')`;
  return dbPool.execute(querySQL);
};

module.exports = { getAllBooks, createNewBook, searchBook };
