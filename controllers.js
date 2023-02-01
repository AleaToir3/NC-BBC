const {
  dataGetTopics,
  dataGetArticles,
  dataGetArticleById,
  dataCommentsByArticleId,
  dataPostCommentByArticleId,
  dataPatchVote,
  dataGetusers,
} = require("./models");

// TASK 3
const getTopics = (req, res) => {
  return dataGetTopics().then((datatopics) => {
    res.status(200).send({ topics: datatopics });
  });
};
// TASK 4
const getArticles = (req, res,next) => {
  
  let querySortBy = req.query.sort_by
  let queryOrderBy = req.query.order;
  
  return dataGetArticles(queryOrderBy,querySortBy).then((dataArticles) => {
    res.status(200).send({ articles: dataArticles });
  }).catch((err)=>{
       next(err)
       });
};


// TASK 5 && 11
const getArticleById = (req, res, next) => {
let articleId;
  if(!isNaN(req)){
    articleId = req
  }else{
    articleId = parseInt(req.params.article_id);
    console.log("🚨🔥 c PAS!!!! un number", articleId);

  } 
  if(articleId == NaN){
    console.log(":poo:");
    return next({code : 400 , msg : "400, invalid ID"})
  }  
  return dataGetArticleById(articleId).then((article) => {    
    res.status(200).send({ articleId: article })
    })
    .catch((err)=>{
       next(err)
       });
  }
 
// TASK 6
const getCommentsArticle = (req, res, next) => {
  //🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
  const articlesId = req.params.article_id;
  
  return dataCommentsByArticleId(articlesId).then((resComments) => {
    console.log("🚨🔥  file: controllers.js:58  returndataCommentsByArticleId  resComments", resComments);
    
    res.status(200).send({ commentsByArticle: resComments })
  }).catch((err)=>{
    next(err)
    });
};

// TASK 7
const postCommentByArticleId = (req, res, next) => {
  const postCommentId = {
    article_id: req.params.article_id,
    body: req.body.body,
    author: req.body.author,
  };

  return dataPostCommentByArticleId(postCommentId).then((resPost) => {    
    return res.status(201).send({ postCommentById: resPost });
  });
};

// TASK 8
const patchVote = (req, res, next) => {
  const paramsId = req.params.article_id;
  const patchVotes = req.body.inc_votes;

  return dataPatchVote(paramsId, patchVotes)
    .then((updateComment) => {
      return res.status(200).send({ vote: updateComment });
    })
    .catch((err) => {
      next(err);
    });
};

// TASK 9
const getUsers = (req, res, next) => {
  return dataGetusers(req, res)
    .then((dataUsers) => {
      res.status(200).send({ users: dataUsers });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getTopics,
  getArticles,
  getArticleById,
  getCommentsArticle,
  getUsers,
  postCommentByArticleId,
  patchVote,
};
