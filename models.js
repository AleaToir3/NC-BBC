const db = require("./db/connection")

const dataGetTopics = () =>{
 return db.query(`SELECT * FROM topics`).then((topics)=>{
    return topics.rows
 })
}

const dataGetArticles = (req,res) => {
   const column = ["article_id","title","topic","author","body","created_at","votes","article_img_url"];
   let querySortBy = req.query.sort_by
   let queryOrderBy = req.query.order;

   querySortBy = column.filter((e)=> e == querySortBy)

   querySortBy.length == 0 ? querySortBy = "created_at" : querySortBy = querySortBy[0]
   queryOrderBy == "ASC" ? queryOrderBy = "ASC" : queryOrderBy = "DESC"

   const query =  `SELECT articles.*,
            COUNT(comments.article_id) AS comment_count
            FROM articles 
            LEFT JOIN comments ON articles.article_id = comments.article_id
            GROUP BY articles.article_id
            ORDER BY articles.${querySortBy} ${queryOrderBy};
            `
    return db.query(query).then((articles) => {
          return articles.rows
      })
}

//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
//🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸🥸
const dataGetArticleById = (articleId) => {
 
   const query = `SELECT articles.*,SUM(comments.article_id) comment_count
               FROM articles
               LEFT JOIN comments
               ON articles.article_id = comments.article_id
               WHERE articles.article_id = $1
               GROUP BY articles.article_id ;`

   return db.query(query,[articleId])
   .then((article) => {
      if(article.rows.length == 0){
         return Promise.reject({code : 404 , msg : "404, NON existent ID"})
      }else return article.rows   })
      
}

const dataCommentsByArticleId = (articleId)=>{
   const query = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`;
   return db.query(query,[articleId]).then((commentsByArticle)=>{
      return commentsByArticle.rows
   });
}

const dataPostCommentByArticleId = (params) => {
   const query = `INSERT INTO comments(body,article_id,author) 
                  VALUES ($1,$2,$3) 
                  RETURNING *;                  
                  `
   return db.query(query,[params.body,params.article_id,params.author]).then((res) => {      
      	return res.rows
   })
}

const dataPatchVote  = (params,patchVotes) => {
if(!patchVotes){
   return Promise.reject({code : 400 , msg : "Bad Requet From no patchVotes"})
}
   const query = `
      UPDATE articles 
         SET votes = votes + $1
         WHERE article_id = $2  RETURNING *`;
   return db.query(query,[patchVotes,params]).then((res) => {
      return res.rows[0]
      })
}

const dataGetusers = () =>{
   return db.query(`SELECT * FROM users`).then((users) => {
      return users.rows
   })
  }

module.exports = {
    dataGetTopics,
    dataGetArticles,
    dataGetArticleById,
    dataCommentsByArticleId,
    dataPostCommentByArticleId,
    dataPatchVote,
    dataGetusers,
 } 

