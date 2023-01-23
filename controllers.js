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
//🚨🚨🚨🚨
const getArticles = (req, res) => {
    // console.log("🚨🔥controllers.js:20  req", req.query);

    console.log("BONJOUR CONTROLLER");
  return dataGetArticles(req, res).then((dataArticles) => {
    res.status(200).send({ articles: dataArticles });
  });
};
// TASK 5 && 11
const getArticleById = (req, res) => {
  const articleId = req.params.article_id;

  return dataGetArticleById(articleId).then((article) => {
    return res.status(200).send({ articleId: article });
  });
};
// TASK 6
const getCommentsArticle = (req, res) => {
  const articlesId = req.params.article_id;
  return dataCommentsByArticleId(articlesId).then((resComments) => {
    return res.status(200).send({ commentsByArticle: resComments });
  });
};

// TASK 7
const postCommentByArticleId = (req, res) => {
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
