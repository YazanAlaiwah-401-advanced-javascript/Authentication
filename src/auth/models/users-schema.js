'use strict';
const SECRET = process.env.SECRET || 'notYourBusiness';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token:{type:String},
});

User.pre('save', async function (next) {
  try {
    let hashedPassword = await bcrypt.hash(this.password, 6);
    this.password = hashedPassword;
    this.token = jwt.sign({id: this._id }, SECRET, { expiresIn: 60*15});
    next();

  } catch (e) {
    console.log(e.message);
  }
});

User.statics.authenticateUser = async function (pass, hash) {
  let validPass;
  try {
    validPass = await bcrypt.compare(pass, hash);
  } catch (e) {
    console.log(e.message);
  }
  return validPass;
};

User.statics.generateToken = function (id) {
  const userToken = jwt.sign({id: id }, SECRET, { expiresIn: 60*15});
  return userToken;
};

User.statics.authenticateToken = async function (token) {
  try {
    const tokenObject = await jwt.verify(token, SECRET);
    let user = await this.find({_id:tokenObject.id});
    if(user[0].token !== token) return Promise.reject({message:'NOt the same token'});
    let newToken = this.generateToken(user[0]._id);
    let newUser = await this.findOneAndUpdate({_id:user[0]._id},{token:newToken},{new:true});
    if (user[0]) {
      return Promise.resolve(newUser);
    } else {
      return Promise.reject({message:'User is not found!'});
    }
  } catch (e) {
    return Promise.reject({message:e.message});
  }
};

module.exports = mongoose.model('user', User);


