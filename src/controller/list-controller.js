const { Op } = require('sequelize');
const { TodoList, TodoItem } = require('../models').models;
const errorsMap = require('../lib/errorsMap');

const listConrtoller = {};

listConrtoller.all = async (UserId) => {
  if (UserId) {
    const all = await TodoList.findAll({
      where: {
        UserId,
      },
    });

    return all;
  } else {
    return [];
  }
};

listConrtoller.create = async (body) => {
  try {
    const newList = await TodoList.create(body);
    return newList;
  } catch (err) {
    return { errors: errorsMap(err.errors) };
  }
};

listConrtoller.find = async (id) => {
  try {
    const list = await TodoList.findByPk(id);

    if (list) {
      return list;
    } else {
      return { error: 'Not Found' };
    }
  } catch (error) {
    return { error: 'Something went wrong' };
  }
};

listConrtoller.update = async (id, body) => {
  const list = await listConrtoller.find(id);

  if (list.error) {
    return list;
  } else {
    if (Object.keys(body).length) {
      const listUpdated = await list.update(body);
      return listUpdated;
    }

    return list;
  }
};

listConrtoller.getItems = async (id) => {
  const list = await listConrtoller.find(id);

  if (list.error) {
    return list;
  } else {
    const items = await list.getTodoItems();
    return items;
  }
};

listConrtoller.createItem = async (id, body) => {
  const list = await listConrtoller.find(id);

  if (list.error) {
    return list;
  } else {
    try {
      const item = await list.createTodoItem(body);
      return item;
    } catch (err) {
      return { errors: errorsMap(err.errors) };
    }
  }
};

listConrtoller.delete = async (id) => {
  const list = await listConrtoller.find(id);

  if (list.error) {
    return list;
  } else {
    const destroyed = await list.destroy();
    return destroyed;
  }
};

module.exports = listConrtoller;
