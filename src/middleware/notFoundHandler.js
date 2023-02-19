const notFoundHandler = (req, res, next) => {
  const err = new Error('Gambar tidak ditemukan');
  err.status = 404;
  res.status(err.status);
  res.send({
    error: {
      message: err.message,
    },
  });
  next();
};

module.exports = notFoundHandler;
