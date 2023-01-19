const express = require('express');
const {getTopics,getArticles} = require('./controllers');



const app = express();

app.use(express.json());
// ==================   GET   ==================
       //  -----    3    ------
app.get("/api/topics",getTopics);

       //  -----    4    ------
app.get("/api/articles",getArticles);


module.exports = app;