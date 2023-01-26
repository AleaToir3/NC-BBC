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

// //  -----    3    ------
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
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("description", expect.any(String));
          expect(topic).toHaveProperty("slug", expect.any(String));
        });
      });
  });
});

//🚨🚨🚨🚨
//  -----    4 - 10    ------
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
          - comment_count`, () => {
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
  test("Should return an array of objects greather than 0", () => {
    return request(app)
      .get("/api/articles")
      .then((res) => {
        const articles = res.body.articles.length;
        expect(articles).toBeGreaterThan(0);
      });
  });
  test("Should return an array of objects DESC", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=desc")
      .then((res) => {
        const articles = res.body.articles;

        expect(articles.length > 0).toBe(true);
        expect(articles[0].article_id).toBe(12);
        expect(articles[articles.length-1].article_id).toBe(1);
      });
  });
});
//  -----    5  && 11   ------
describe("Task-5 && 11 GET:/api/articles/id", ()=>{
  test("responds with status 200", () => {
    return request(app).get("/api/articles/3").expect(200);
  });

  test("Length of my articles should be greather then 0", () => {
    return request(app)
      .get("/api/articles/1")
      .then((res) => {
        const article = res.body.articleId;
        expect(article).not.toHaveLength(0);
      });

  });
})
  test(`Each comments should have :
          - author
          - title
          - article_id
          - body
          - topic
          - created_at
          - votes
          - article_img_url
          - (11)comment_count
          `, () => {
    return request(app)
      .get("/api/articles/1")
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
          expect(comments).toHaveProperty("comment_count");
        });
      });
  });


//  -----    6    ------
describe("Task-6 GET:/api/articles/id_article/comments", () => {
  test("reponse with status 200", () => {
    return request(app).get("/api/articles/1/comments").expect(200);
  });

  test("Should return un array of objects", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const commentsByArticle = res.body.commentsByArticle;
        expect(Array.isArray(commentsByArticle)).toBe(true);
      });
  });
  test("Should return un array of objects greather than 0", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const commentsByArticle = res.body.commentsByArticle.length;
        expect(commentsByArticle).toBeGreaterThan(0);
      });
  });

  test(`Each property should have :
        - comment_id
        - votes
        - created_at
        - author
        - body
        - article_id`, () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then((res) => {
         
        const checkPropertyCommentsByArticles = res.body.commentsByArticle;


        checkPropertyCommentsByArticles.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
        });
      });
  });
});
//  -----    7    ------
const comment = { body: "SUPERMAN CAN'T FLY I SEE HIM !", author: "lurker" };

describe("Task-7 POST:/api/articles/:article_id/comments", () => {
  test(`Should return an 201 status`, () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(201);
  });

  test(`Add and new comment in an articles with :
                - body: "SUPERMAN CAN'T FLY I SEE HIM !"
                - author:  "lurker"`, () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(201)
      .then((res) => {
        return db.query(`SELECT * FROM comments WHERE comment_id = 19`);
      })
      .then((res) => {
        expect(res.rows[0]).toHaveProperty(
          "body",
          "SUPERMAN CAN'T FLY I SEE HIM !"
        );
        expect(res.rows[0]).toHaveProperty("author", "lurker");
      });
  });
});

//  -----    8    ------

const newVote = { inc_votes: 2 };
describe("Task-8 /api/articles/:article_id", () => {
  test("Should return 200 status", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({ inc_votes: 2 })
      .expect(200);
  });
});
//  -----    9    ------
describe("Task-9 /api/users",()=>{
  test("return status 200",()=>{
      return request(app).get("/api/users").expect(200)
  })
  test("return all users",()=>{

    return request(app)
    .get("/api/users")
    .then((res) => {
      const users = res.body.users;
      expect(users).not.toHaveLength(0);
      expect(users[0]).toHaveProperty("username", expect.any(String));
      expect(users[0]).toHaveProperty("name", expect.any(String));
      expect(users[0]).toHaveProperty("avatar_url", expect.any(String));
    });
  })    
})



// //  -----   12    ------
// //  -----   13    ------

