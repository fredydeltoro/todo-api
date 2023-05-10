const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models').models;
const errorsMap = require('../lib/errorsMap');
const userController = {};

userController.create = async (userBody) => {
  userBody.password = await bcrypt.hash(userBody.password, 10);

  const isUser = await User.findOne({ where: { email: userBody.email } });

  if (!isUser) {
    try {
      let newUser = await User.create(userBody);
      newUser = newUser.dataValues;
      delete newUser.password;
      return newUser;
    } catch (err) {
      return { errors: errorsMap(err.errors) };
    }
  } else {
    return { errors: ['User already exists'] };
  }
};

userController.login = async ({ user, password }) => {
  const currentUser = await User.findOne({
    where: {
      [Op.or]: [{ username: user }, { email: user }],
    },
  });

  if (!currentUser) {
    return { error: 'User does not exist' };
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
        return { token };
      } catch (error) {
        return { error: 'Something went wrong' };
      }
    } else {
      return { error: 'Password does not match' };
    }
  }
};

module.exports = userController;
