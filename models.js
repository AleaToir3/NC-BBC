const db = require("./db/connection")

const dataGetTopics = () =>{
 return db.query(`SELECT * FROM topics`).then((topics)=>{
    return topics.rows
 })
}

const dataGetArticles = ()=>{
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

module.exports = {
   dataGetTopics,
   dataGetArticles,
} 
