const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const app = require("../app");
const request = require("supertest");

const index = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(index);
});

afterAll(() => {
  db.end();
});
       //  -----    3    ------
describe("Task-3 GET:/api/topics", () => {      
  test("responds with status 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("Length of my topic should be greather then 0", () => {
    return request(app)
      .get("/api/topics")
      .then((res) => {
        const topics = res.body.topics;
        expect(topics).not.toHaveLength(0);
        // or
        // expect(topic.length > 0).toBe(true);
      });
  });
  test("returns correct body", () => {
    return request(app)
      .get("/api/topics")
      .then((res) => {
        const topics = res.body.topics;
        topics.forEach(topic => {
          expect(topic).toHaveProperty("description",expect.any(String));
          expect(topic).toHaveProperty("slug",expect.any(String));
        });
      });
  });
});

      //  -----    4    ------
describe("Task-4 GET:/api/articles", () => {
  test("respons with status 200", () => {
    return request(app).get("/api/articles").expect(200);
  });
  test(`An article should have the follow property:
          - propertyaurhot,
          - title,
          - article_id,
          - topic_createe_at,
          - votes,
          - article_img_url,
          - comment_count`
    , () => {
    return request(app)
      .get("/api/articles")
      .then((res) => {
        const articles = res.body.articles;
        expect(articles.length > 0).toBe(true);
        articles.forEach((article) => {
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
        });
      });
  });
});

      //  -----    5    ------
describe("Task-5 GET:/api/articles/id", () => {

  test("responds with status 200", () => {
    return request(app).get("/api/articles/3").expect(200)
  });

  test("Length of my articles should be greather then 0", () => {
    return request(app)
      .get("/api/articles/3")
      .then((res) => {
        const article = res.body.articleId;
        expect(article).not.toHaveLength(0);
      });
  });

    test(`Each comments should have :
          - author
          - title
          - article_id
          - body
          - topic
          - created_at
          - votes
          - article_img_url
          `, () => {
    return request(app)
      .get("/api/articles/3")
      .then((res) => {
        const article = res.body.articleId;
        expect(article.length > 0).toBe(true);
        article.forEach((comments) => {
          expect(comments).toHaveProperty("author");
          expect(comments).toHaveProperty("title");
          expect(comments).toHaveProperty("article_id");
          expect(comments).toHaveProperty("body");
          expect(comments).toHaveProperty("topic");
          expect(comments).toHaveProperty("article_id");
          expect(comments).toHaveProperty("created_at");
          expect(comments).toHaveProperty("votes");
          expect(comments).toHaveProperty("article_img_url");
        });
      });
  });
});
    