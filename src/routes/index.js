const health = require('./health');
const create = require('./create');

module.exports = (app) => {
  app.use('/health', health);
  app.use('/api/create', create);
};
