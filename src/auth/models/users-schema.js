'use strict';
const SECRET = process.env.SECRET || 'notYourBusiness';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.Schema({
  username:{type:String,required:true,unique:true},
  password:{type:String,required:true},
});

User.pre('save',async function(next){
  try{
    let hashedPassword = await bcrypt.hash(this.password,6);
    this.password = hashedPassword;
    next();

  }catch(e){
    console.log(e.message);
  }
});

User.statics.authenticateUser = async function(pass,hash){
  let validPass;
  try{
    validPass = await bcrypt.compare(pass,hash); 
  }catch(e){
    console.log(e.message);
  }
  return validPass;
};

User.statics.generateToken = function(userName){
  const userToken = jwt.sign({userName:userName},SECRET);
  return userToken;
};

module.exports = mongoose.model('user',User);


