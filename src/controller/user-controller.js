const bcrypt = require('bcrypt');
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

userController.findUser = async (user) => {
  try {
    const currentUser = await User.findOne({
      where: {
        [Op.or]: [{ username: user }, { email: user }],
      },
    });

    return currentUser;
  } catch (error) {
    return { error };
  }
};

module.exports = userController;
