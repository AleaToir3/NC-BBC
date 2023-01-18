const express = require('express');
const {getTopics,getArticles,getArticleById,getCommentsArticle,
       postCommentByArticleId,
} = require('./controllers');


const app = express();

app.use(express.json());
// ==================   GET   ==================
       //  -----    3    ------
app.get("/api/topics",getTopics);

       //  -----    4    ------
app.get("/api/articles",getArticles);

       //  -----    5    ------
app.get("/api/articles/:article_id",getArticleById)

module.exports = app;