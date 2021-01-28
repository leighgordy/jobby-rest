const jobs = require('./routes/jobs');
const errorHandler  = require('./error-handler');

module.exports = (app) => {
  app.use('/jobs', jobs);
  app.use(errorHandler);
  return app;
};
