const health = require('./health');
const signup = require('./signup');
const login = require('./login');
const todos = require('./todos');

module.exports = (app) => {
  app.use('/health', health);
  app.use('/api/signup', signup);
  app.use('/api/login', login);
  app.use('/api/todos', todos);
};
