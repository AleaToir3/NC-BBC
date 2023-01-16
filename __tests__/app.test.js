const db = require('../db/connection');
const seed = require('../db/seeds/seed')
const app = require('../app')
const request = require("supertest")

const index = require("../db/data/test-data/index");

beforeEach(() => {
 return seed(index);
});

afterAll(() => {
db.end();
});

describe.only("get /api/topics", () => {
  test("responds with status 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("returns correct body", () => {
    return request(app)
      .get("/api/topics")
      .then((res) => {
        console.log(">>>>TEST",res.body[0]);
        const topic = res.body[0];
        expect(topic).toHaveProperty("description");
        expect(topic).toHaveProperty("slug");
      });
  });
});