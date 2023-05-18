const { Op } = require('sequelize');
const { TodoItem } = require('../models').models;
const errorsMap = require('../lib/errorsMap');

const itemController = {};

itemController.update = async (listId, id, body) => {
  const item = await TodoItem.findOne({
    where: {
      [Op.and]: [{ TodoListId: listId }, { id }],
    },
  });

  if (item) {
    const newItem = await item.update(body);

    return newItem;
  } else {
    return { error: 'Not Found' };
  }
};

itemController.delete = async (listId, id) => {
  const item = await TodoItem.findOne({
    where: {
      [Op.and]: [{ TodoListId: listId }, { id }],
    },
  });

  if (item) {
    const newItem = await item.destroy();

    return newItem;
  } else {
    return { error: 'Not Found' };
  }
};

module.exports = itemController;
