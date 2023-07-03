const express = require('express');
const router = express.Router();
const listController = require('../../controller/list-controller');
const itemController = require('../../controller/item-controller');

router.get('/', async (req, res) => {
  const { userId } = res.locals.user;
  const all = await listController.all(userId);

  res.status(200).json(all);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const user = res.locals.user;
  const newList = await listController.create({ ...body, UserId: user.userId });
  let status = 201;

  if (newList.errors) {
    status = 400;
  }

  res.status(status).json(newList);
});

router.get('/:id', async (req, res) => {
  const list = await listController.find(req.params.id);
  let status = 200;

  if (list.error) {
    status = 400;
  }

  res.status(status).json(list);
});

router.put('/:id', async (req, res) => {
  let status = 201;
  const list = await listController.update(req.params.id, req.body);

  if (list.error) {
    status = 400;
  }

  res.status(status).json(list);
});

router.delete('/:id', async (req, res) => {
  const list = await listController.delete(req.params.id);

  if (list.error) {
    res.status(400).json(list);
  } else {
    res.sendStatus(204);
  }
});

// items

router.get('/:id/items', async (req, res) => {
  const items = await listController.getItems(req.params.id);
  let status = 200;

  if (items.error) {
    status = 400;
  }

  res.status(status).json(items);
});

router.post('/:id/items', async (req, res) => {
  const body = req.body;
  let status = 201;
  const item = await listController.createItem(req.params.id, body);

  if (item.errors) {
    status = 400;
  }

  res.status(status).json(item);
});

router.patch('/:listId/items/:id', async (req, res) => {
  const { listId, id } = req.params;
  const body = req.body;
  let status = 201;

  const newItem = await itemController.update(listId, id, body);

  if (newItem.error || newItem.errors) {
    status = 400;
  }

  res.status(status).json(newItem);
});

router.delete('/:listId/items/:id', async (req, res) => {
  const { listId, id } = req.params;
  const body = req.body;

  const newItem = await itemController.delete(listId, id, body);

  if (newItem.error) {
    res.status(400).json(newItem);
  } else {
    res.sendStatus(204);
  }
});

module.exports = router;
