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

module.exports = router;
