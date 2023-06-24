const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TodoList extends Model { }

  TodoList.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'TodoList',
    },
  );

  return TodoList;
};
