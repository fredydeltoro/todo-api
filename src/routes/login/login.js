const express = require('express');
const router = express.Router();
const userController = require('../../controller/user-controller');

router.post('/', async (req, res) => {
  const auth = await userController.login(req.body);
  let status = 200;

  if (auth.error) {
    status = 400;
  }
  res.status(status).json(auth);
});

module.exports = router;
