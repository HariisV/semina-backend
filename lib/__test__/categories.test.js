// const handlers = require('./../handlers');
const request = require('supertest');
const app = require('./../../app');
// const {
//   create,
//   index,
//   find,
//   update,
//   destroy,
// } = require('../../app/api/v1/categories/controller');

// test('testing Categories', () => {
//   let a = 1 + 1;
//   // const req = {},
//   //   res = { render: jest.fn() };
//   // handlers.home(req, res);
//   // expect(a).toBe(2);
//   request.
// });
// describe('GET Created Categories', () => {
//   it('should return all products', async () => {
//     const res = await request(app).get('/api/v1/cms/categories');
//     // console.log(res);
//     expect(res.statusCode).toBe(200);
//     // expect(res.body.length).toBeGreaterThan(0);
//   });
// });
describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
describe('Test the root path 2', () => {
  test('It should response the GET method', () => {
    return request(app).get('/').expect(200);
  });
});

// Database Connection
describe('Test the addLike method', () => {
  beforeAll(() => {
    mongoDB.connect();
  });

  afterAll((done) => {
    mongoDB.disconnect(done);
  });
});

// Refrensi : https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
