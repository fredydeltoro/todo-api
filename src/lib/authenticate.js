const jwt = require('jsonwebtoken');
const exclude = ['login', 'signup'];

const authenticate = async (req, res, next) => {
  const path = req.path.split('/');

  if (exclude.includes(path[2])) {
    next();
  } else {
    const token = req.headers.authorization?.split(' ');

    if (token && token?.length > 1) {
      try {
        const decoded = jwt.verify(token[1], 'topsecret');
        res.locals.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ error });
      }
    } else {
      res.sendStatus(401);
    }
  }
};

module.exports = authenticate;
