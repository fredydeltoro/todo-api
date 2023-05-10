const { TodoList } = require('../models').models;

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

module.exports = listConrtoller;
