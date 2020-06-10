'use strict';
const express = require('express');
const route = express.Router();
const bearerMiddleware = require('./auth/middleware/bearer.js');
const permissions = require('./auth/middleware/authorize.js');

route.get('/secret',bearerMiddleware,(req,res)=>{
  res.json(req.user);
});


route.get('/read', bearerMiddleware, permissions('read'),(req,res)=>{
  res.send('the read route work');
});
route.post('/add', bearerMiddleware, permissions('create'),(req,res)=>{
  res.send('the add route work');
});
route.put('/change', bearerMiddleware, permissions('update'),(req,res)=>{
  res.send('the change route work');
});
route.delete('/remove', bearerMiddleware, permissions('delete'),(req,res)=>{
  res.send('the remove route work');
});

module.exports = route;
