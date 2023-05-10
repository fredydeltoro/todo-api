const express = require('express');
const router = express.Router();
const listController = require('../../controller/list-controller');

router.get('/', async (req, res) => {
  const userId = res.locals.user.userId;
  const all = await listController.all(userId);

  res.status(200).json(all);
});

module.exports = router;
