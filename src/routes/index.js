const health = require('./health');
const signup = require('./signup');
const login = require('./login');

module.exports = (app) => {
  app.use('/health', health);
  app.use('/api/signup', signup);
  app.use('/api/login', login);
};
