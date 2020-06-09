'use strict';
const user = require('../models/users-schema.js');
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next('Invalid Login no auth headers');
    } else {
      const [auth, token] = req.headers.authorization.split(' ');
      if (auth === 'Bearer') {
        let x = await user.authenticateToken(token);
        req.user = x;
      } else {
        next('Invalid auth header');
      }
    }
    next();
  } catch (e) {
    next(e.message);
  }
};


