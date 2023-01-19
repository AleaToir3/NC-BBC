const {dataGetTopics,dataGetArticles,dataGetArticleById} = require("./models")

// TASK 3
const getTopics = (req,res)=>{
    return dataGetTopics().then(
        (datatopics) => {
            res.status(200).send({topics: datatopics})
        }
    )
;}
// TASK 4
const getArticles = (req,res)=>{
 return dataGetArticles().then(
     (dataArticles) => {
      
         res.status(200).send({articles: dataArticles})
     }
 )
}
// TASK 5
const getArticleById = (req,res,next)=>{
 const  articleId = req.params.article_id 
 return dataGetArticleById(articleId).then(
     (article) => {
         res.status(200).send({articleId: article})
     }
 ).catch((err)=>{
    next(err)
 })
}

module.exports = {getTopics,getArticles,getArticleById }
