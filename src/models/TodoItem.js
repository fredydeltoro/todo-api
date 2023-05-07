const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TodoItem extends Model {}

  TodoItem.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'TodoItem',
    },
  );

  return TodoItem;
};
