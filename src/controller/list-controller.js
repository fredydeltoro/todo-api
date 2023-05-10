const { TodoList } = require('../models').models;
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
    return list;
  } catch (error) {
    return { error: 'Something went wrong' };
  }
};

listConrtoller.update = async (id, body) => {
  const list = await listConrtoller.find(id);

  if (list.error) {
    return list.error;
  } else {
    if (Object.keys(body).length) {
      const listUpdated = await list.update(body);
      return listUpdated;
    }

    return list;
  }
};

module.exports = listConrtoller;
