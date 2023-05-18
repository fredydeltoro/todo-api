const express = require('express');
const router = express.Router();
const userController = require('../../controller/user-controller');

router.post('/', async (req, res) => {
  const newUser = await userController.create(req.body);

  if (newUser.errors) {
    res.status(400).json({ errors: newUser.errors });
  } else {
    res.status(201).json(newUser);
  }
});

module.exports = router;
