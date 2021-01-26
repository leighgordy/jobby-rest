const jobs = require('./routes/jobs');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: err.message });
};

module.exports = (app) => {
  app.use('/jobs', jobs);
  app.use(errorHandler);
};
