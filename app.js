const express = require('express');
const {getTopics,getArticles,getArticleById,getCommentsArticle,getUsers,
       postCommentByArticleId,
       patchVote,
} = require('./controllers');
const {errBadRequest,errTopics,errComments} = require('./errBBC');


const app = express();

app.use(express.json());

                                                            

// ==================   GET   ==================
       //  -----    3    ------
app.get("/api/topics",getTopics);

       //  -----    4    ------
app.get("/api/articles",getArticles);
       

       //  -----    5 & 11    ------
app.get("/api/articles/:article_id",getArticleById)

       //  -----    6    ------
 //🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
app.get("/api/articles/:article_id/comments",getCommentsArticle)

      //  -----    9    ------
app.get("/api/users",getUsers)

       //  -----    4    ------
app.get("/api/articles",getArticles);


// ==================   POST   ==================

       //  -----    7    ------
app.post("/api/articles/:article_id/comments",postCommentByArticleId)

// ==================   PATCH   ==================


//  -----    8    ------
app.patch("/api/articles/:article_id",patchVote)

      //  -----    10    ------
      //  -----    12    ------

// HANDLING MIDLLEWARE ERRORS
// app.use((err, req, res, next) => {
//        console.log("========= MY LOG ===========",err); 
//        res.status(500).send({ msg: "Internal Server 33333rror" });
// });




app.use(errBadRequest);
app.use(errTopics);
app.use(errComments);

module.exports = app; 