const { Sequelize } = require('sequelize');
const User = require('./User');
const TodoList = require('./TodoList');
const TodoItem = require('./TodoItem');

const sequelize = new Sequelize('todo_db', 'username', '', {
  host: 'localhost',
  dialect: 'postgress',
});

sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Relations

User.hasMany(TodoList);
TodoList.belongsTo(User);
TodoList.hasMany(TodoItem);
TodoItem.belongsTo(TodoList);

module.exports = sequelize;
