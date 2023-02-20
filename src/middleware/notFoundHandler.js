const notFoundHandler = (req, res, next) => {
  //   const err = new Error('Gambar tidak ditemukan');
  //   res.status(404);
  //   err.status = 404;
  //   res.status(err.status);
  // res.send({
  //     error: {
  //       message: err.message,
  //     },
  //   });
  res.status(404).json({
    message: 'Gambar tidak ditemukan',
  });
  next();
};

module.exports = notFoundHandler;
