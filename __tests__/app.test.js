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

describe("get /api/topics", () => {
  test("responds with status 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("returns correct body", () => {
    return request(app)
      .get("/api/topics")
      .then((res) => {
        const topic = res.body.datatopics[0];
        expect(topic).toHaveProperty("description",expect.any(String));
        expect(topic).toHaveProperty("slug");
      });
  });
});

describe("get /api/articles",()=>{
  test("respons with status 200",()=>{
    return request(app).get("/api/articles").expect(200);    
  })
  test("should have propertyaurhot,title,article_id,topic_createe_at,votes,article_img_url,comment_count",()=>{
    return request(app).get("/api/articles").then(
      (res)=>{
        const articles = res.body;
          expect(articles.length > 0).toBe(true);
          articles.forEach(article => {          
          expect(article).toHaveProperty("author");
          expect(article).toHaveProperty("title");
          expect(article).toHaveProperty("article_id");
          expect(article).toHaveProperty("topic");
          expect(article).toHaveProperty("created_at");
          expect(article).toHaveProperty("votes");
          expect(article).toHaveProperty("article_img_url");
          expect(article).toHaveProperty("comment_count");
        });
      })
  });
});

describe.only("GET : /api/articles/article_id",()=>{
  test("responds with status 200", () => {
    return request(app).get("/api/articles/3").expect(200);
  });
  test("each comments should have comment_id,votes,created_at,author,body,article_id property",()=>{
    return request(app).get("/api/articles/3").then((res) => {
    const commentsByArticleId = res.body;
    expect(commentsByArticleId.length > 0).toBe(true);
    commentsByArticleId.forEach(comments => {    
    expect(comments).toHaveProperty("comment_id");    
    expect(comments).toHaveProperty("votes");    
    expect(comments).toHaveProperty("created_at");    
    expect(comments).toHaveProperty("author");    
    expect(comments).toHaveProperty("body");    
    expect(comments).toHaveProperty("article_id");    
        })
    })
  })
})






