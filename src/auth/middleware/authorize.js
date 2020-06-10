'user strict';
const User = require('../models/users-schema.js');
/**
 * @function permission
 * @param {String} capability the permission the  route need
 */
module.exports = (capability)=> (req,res,next) =>{
  let user = req.user;
  if(User.can(capability,user.role)){
    next();
  }else{
    next('Not Allow');
  }
};
