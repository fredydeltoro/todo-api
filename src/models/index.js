const { Sequelize } = require('sequelize');
const user = require('./User');
const todoList = require('./TodoList');
const todoItem = require('./TodoItem');

const sequelize = new Sequelize('todo_db', '', '', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = user(sequelize);
const TodoList = todoList(sequelize);
const TodoItem = todoItem(sequelize);

// Relations

User.hasMany(TodoList);
TodoList.belongsTo(User);
TodoList.hasMany(TodoItem);
TodoItem.belongsTo(TodoList);

sequelize
  .sync()
  .then(() => {
    console.log('====== Connection has been established successfully. ======');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
