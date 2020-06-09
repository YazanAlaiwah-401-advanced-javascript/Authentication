'use strict';
const userSchema = require('./users-schema.js');

class UserCollection {
  constructor(){
    this.schema = userSchema;
  }

  async create(userInfo){
    let that = this;
    return new Promise(function(res,rej){
      try{

        let user = new that.schema(userInfo);
        user.save().then(data=>{
          let userToken = that.schema.generateToken(data._id);
          return res({token:userToken, user:data});
        }).catch(e=>rej(new Error('user is here')));
      }catch(e){
        rej(new Error('user is here'));
      }
    });
  }
  async read(userInfo){
    if(userInfo!== undefined){
      let record = await this.schema.find({username:userInfo.username});
      if(record.length > 0){
        let valid = await this.schema.authenticateUser(userInfo.password,record[0].password);
        if(valid){
          let token = await this.schema.generateToken(record._id);
          return {
            token,
            user:record[0],
          };
        }else{
          return 'Not The same pass';
        }

      }else{
        return 'this username has not sign up';
      }
    }else{
      let record = await this.schema.find({});
      return record;
    }
  }
}
module.exports = new UserCollection();  