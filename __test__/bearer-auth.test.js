'user strict';
const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server.js').server;
const mockRequest = supergoose(server);

describe('BEARER AUTH MODULE', () => {
  let user = {
    username:'ruwaaaaid',
    password:'5523',
  };
  it('its should return error if something went wrong',()=>{
    return mockRequest.get('/secret').send(user)
      .then(results=>{
        expect(results.status).toEqual(500);  
      });
  });
});

