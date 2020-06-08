'use strict';
const express = require('express');
const router = express.Router();
const basicAuth = require('./middleware/basic.js');
const userCollection = require('./models/users-collection.js');
const github = require('./middleware/oauth.js');

router.post('/signup', async (req,res,next)=>{
  let record;
  try {
    record = await userCollection.create(req.body);
    res.send(record);
  }catch(e){
    console.log(e.message);
    next('user is in the data');
  }
});

router.post('/signin',basicAuth, async (req,res,next)=>{
  let record = await userCollection.read(req.body);
  if(typeof record !== 'string'){
    res.cookie('token',record.token);
    res.json(record);
  }else{
    next(record);
  }
});

router.get('/users',basicAuth,async (req,res,next)=>{
  let valid = await userCollection.read(req.body);
  if(typeof valid !== 'string'){
    let record = await userCollection.read();
    res.json(record);
  }else{

    next(valid);
  }
});

router.get('/oauth',github,(req,res)=>{
  console.log(req.recorde);
  res.json(req.recorde);
});

module.exports = router;