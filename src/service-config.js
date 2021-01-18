const jobs = require('./routes/jobs');

module.exports = (app) => {
  app.use('/jobs', jobs);
};
