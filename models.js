const db = require("./db/connection")

const dataGetTopics = () =>{
 return db.query(`SELECT * FROM topics`).then((topics)=>{
    return topics.rows
 })
}

const dataGetArticles = ()=>{
   // return db.query(`SELECT COUNT(*) as comment_count FROM comments WHERE article_id = 1;
   return db.query(`
   SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.votes,
      articles.created_at,
      articles.article_img_url,
   COUNT(comments.article_id) AS comment_count
   FROM articles 
   LEFT JOIN comments ON articles.article_id = comments.article_id
   GROUP BY articles.article_id
   ORDER BY comment_count DESC;
   `)
   .then((articles)=>{
         return articles.rows
      }
   )
}

const dataGetArticleById = (articleId) => {

   // const query = `SELECT body,author as username FROM articles WHERE article_id=$1;`
   const query = `SELECT * FROM comments WHERE article_id=$1;`
   return db.query(query,[articleId]);
}

// author VARCHAR REFERENCES users(username)









module.exports = {
    dataGetTopics,
    dataGetArticles,
    dataGetArticleById,
 } 

