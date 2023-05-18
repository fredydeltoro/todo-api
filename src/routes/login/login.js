const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userController = require('../../controller/user-controller');

router.post('/', async (req, res) => {
  const { user, password } = req.body;
  const currentUser = await userController.findUser(user);

  if (!currentUser || currentUser.error) {
    res.status(400).json({ error: 'User does not exist' });
  } else {
    const match = await bcrypt.compare(password, currentUser.password);
    const { email, username, id } = currentUser;

    if (match) {
      try {
        const token = await jwt.sign(
          {
            email,
            username,
            userId: id,
          },
          'topsecret',
          { expiresIn: '12h' },
        );
        res.status(202).json({ token });
      } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
      }
    } else {
      res.status(400).json({ error: 'Password does not match' });
    }
  }
});

module.exports = router;
