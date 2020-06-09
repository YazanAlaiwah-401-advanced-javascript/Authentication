'use strict';
const express = require('express');
const route = express.Router();
const bearerMiddleware = require('./auth/middleware/bearer.js');

route.get('/secret',bearerMiddleware,(req,res)=>{
  res.json(req.user);
});




module.exports = route;





