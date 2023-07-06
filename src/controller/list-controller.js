const { TodoList, TodoItem } = require('../models').models;
const errorsMap = require('../lib/errorsMap');

const listConrtoller = {};

listConrtoller.all = async (UserId) => {
  if (UserId) {
    const [results, metadata] = await TodoList.sequelize.query(`
      SELECT 
        "TodoLists"."id", 
        "TodoLists"."name", 
        "TodoLists"."description", 
        COUNT("TodoItems"."id") as ItemsCount 
      FROM 
        "TodoLists" 
        LEFT JOIN "TodoItems" ON "TodoLists"."id" = "TodoItems"."TodoListId" 
      WHERE 
        "TodoLists"."UserId" = ${UserId} 
      GROUP BY 
        "TodoLists"."id"
      ORDER BY "TodoLists"."createdAt"
  `);

    return results;
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
      try {
        const listUpdated = await list.update(body);
        return listUpdated;
      } catch (err) {
        return { errors: errorsMap(err.errors) };
      }
    }

    return list;
  }
};

listConrtoller.getItems = async (id) => {
  const list = await listConrtoller.find(id);

  if (list.error) {
    return list;
  } else {
    const items = await list.getTodoItems({
      order: ['createdAt'],
    });
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
