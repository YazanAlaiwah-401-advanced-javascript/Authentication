'user strict';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server.js').server;
const mockRequest = supergoose(server);

describe('ROUTE MODULE', () => {
  let token;
  let user = {
    username: 'yazan',
    password: '0000',
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
        expect(results.body).toMatchObject({username:'yazan'});
      });

  });
  it('its should return error for the user if its the old token', () => {
    return mockRequest.get('/secret').set({Authorization:`Bearer ${token}`})
      .then(results => {
        expect(results.body).toMatchObject( { username : 'yazan' });
      });
  });
 
});
