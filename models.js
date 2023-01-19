const db = require("./db/connection")

const dataGetTopics = () =>{
 return db.query(`SELECT * FROM topics`).then((topics)=>{
    return topics.rows
 })
}

const dataGetArticles = ()=>{
   return db.query(`
   SELECT articles.*,   
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

   const query = `SELECT * FROM articles WHERE article_id=$1;`
   return db.query(query,[articleId]).then((article)=>{
      return article.rows
   });
}

module.exports = {
   dataGetTopics,
   dataGetArticles,
   dataGetArticleById
} 

