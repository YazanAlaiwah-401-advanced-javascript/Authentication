'user strict';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server.js').server;
const mockRequest = supergoose(server);

describe('ROUTE MODULE', () => {
  let token;
  let newToken;
  let user = {
    username: 'yazan',
    password: '0000',
    role: 'editors',
  };

  it('its should sign the user in the database', () => {
    return mockRequest.post('/signup').send(user)
      .then(results => {
        expect(results.body).toMatchObject({user:{username:'yazan'}});
      });
  });

  it('its should return user data when sign in', () => {
    return mockRequest.post('/signin').set({Authorization:'Basic eWF6YW46MDAwMA=='})
      .then(results => {
        expect(results.body).toMatchObject({user:{username:'yazan'}});
      });
  });

  it('its should return users data when valid user ask for it', () => {
    return mockRequest.get('/users').set({Authorization:'Basic eWF6YW46MDAwMA=='})
      .then(results => {
        token = results.body[0].token;
        expect(results.body[0]).toMatchObject({username:'yazan'});
      });
  });

  it('its should return users data when valid user ask for it', () => {
    return mockRequest.get('/secret').set({Authorization:`Bearer ${token}`})
      .then(results => {
        newToken = results.body.token;
        expect(results.body).toMatchObject({username:'yazan'});
      });
  });

  it('its should return error for the user if its the old token', () => {
    return mockRequest.get('/secret').set({Authorization:`Bearer ${token}a`})
      .then(results => {
        expect(results.status).toEqual(500);
      });
  });

  it('its should allow u to access some roles that user have premssion on', () => {
    return mockRequest.get('/read').set({Authorization:`Bearer ${newToken}`})
      .then(results => {
        expect(results.text).toEqual('the read route work');
      });
  });


  it('its should not allow u to access some roles that user have not premssion on', () => {
    return mockRequest.get('/read').set({Authorization:`Bearer ${newToken}a`})
      .then(results => {
        expect(results.status).toEqual(500);
      });
  });
 
});
