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

module.exports = listConrtoller;
