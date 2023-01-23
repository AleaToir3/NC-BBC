const db = require("./db/connection")

const dataGetTopics = () =>{
 return db.query(`SELECT * FROM topics`).then((topics)=>{
    return topics.rows
 })
}

////🚨🚨🚨🚨
const dataGetArticles = (req,res) => {
   let column = ["article_id","title","topic","author","body","created_at","votes","article_img_url"];
   let orderBy = "DESC";
   
   filterColun = column.filter((e)=>{e==req.query.sort_by})
   
   if(filterColun.length > 0){
      column = "articles."+filterColun[0]
   }else column = "articles.created_at"
   
   const lol = "articles.article_id"
   req.query.orderBy == "ASC" ? req.query.orderBy = "ASC" :  req.query.orderBy = "DESC"
   console.log("🚨🔥  file: models.js:15  dataGetArticles  orderBy", orderBy);
   console.log("🚨🔥  file: models.js:12  dataGetArticles  column", column);
   query =  `SELECT articles.*,
            COUNT(comments.article_id) AS comment_count
            FROM articles 
            LEFT JOIN comments ON articles.article_id = comments.article_id
            GROUP BY $1
            ORDER BY articles.article_id DESC;
            `
    return db.query(query,[lol]).then((articles) => {
      console.log("🚨🔥  file: models.js:23:::", articles);
          return articles.rows
      })
}

const    dataGetArticleById = (articleId) => {

const query = `SELECT articles.*,SUM(comments.article_id) comment_count
FROM articles
LEFT JOIN comments
ON articles.article_id = comments.article_id
WHERE articles.article_id = $1
GROUP BY articles.article_id;`

   return db.query(query,[articleId])
   .then((article) => {
        	return article.rows
   	});   
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

