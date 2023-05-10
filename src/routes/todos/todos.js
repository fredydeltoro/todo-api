const express = require('express');
const router = express.Router();
const listController = require('../../controller/list-controller');

router.get('/', async (req, res) => {
  const userId = res.locals.user.userId;
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
  let status = 200;
  const list = await listController.update(req.params.id, req.body);

  if (list.error) {
    status = 400;
  }

  res.status(status).json(list);
});

module.exports = router;
