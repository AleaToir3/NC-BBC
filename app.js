const express = require('express');
const {getTopics,getArticles,getArticleById,getCommentByArticleId} = require('./controllers');


const app = express();

app.use(express.json());

app.get("/api/topics",getTopics);
app.get("/api/articles",getArticles);
app.get("/api/articles/:article_id",getArticleById)
app.get("/api/articles/:article_id/comments",getCommentByArticleId)



module.exports = app;