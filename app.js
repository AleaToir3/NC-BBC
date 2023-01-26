const express = require('express');
const {getTopics,getArticles,getArticleById,getCommentsArticle,getUsers,
       postCommentByArticleId,
       patchVote,
} = require('./controllers');


const app = express();

app.use(express.json());

// ==================   GET   ==================
       //  -----    3    ------
app.get("/api/topics",getTopics);

       //  -----    4    ------
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
app.get("/api/articles",getArticles);

       //  -----    5 & 11    ------
app.get("/api/articles/:article_id",getArticleById)

       //  -----    6    ------
app.get("/api/articles/:article_id/comments",getCommentsArticle)

      //  -----    9    ------
app.get("/api/users",getUsers)



// ==================   POST   ==================

       //  -----    7    ------
app.post("/api/articles/:article_id/comments",postCommentByArticleId)

// ==================   PATCH   ==================


//  -----    8    ------
app.patch("/api/articles/:article_id",patchVote)

      //  -----    10    ------
      //  -----    12    ------


app.use((err,req,res,next)=>{
       console.log(err);
})

module.exports = app;