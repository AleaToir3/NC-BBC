const {dataGetTopics,dataGetArticles,dataGetArticleById,dataCommentsByArticleId,
    dataPostCommentByArticleId} = require("./models")

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
 return dataGetArticles(req,res).then(
     (dataArticles)=>{
         res.status(200).send({articles: dataArticles})
     }
 )
}
// TASK 5
const getArticleById = (req,res)=>{
 const  articleId = req.params.article_id 
 return dataGetArticleById(articleId).then(
     (article) => {
         res.status(200).send({articleId: article})
     }
 )
}
// TASK 6
const getCommentsArticle = (req,res)=>{
 const articlesId = req.params.article_id
 return dataCommentsByArticleId(articlesId).then((resComments)=>{
     res.status(200).send({commentsByArticle: resComments})
 })
}

// TASK 7
const postCommentByArticleId = (req,res)=>{

 const postCommentId = {article_id : req.params.article_id,
                        body : req.body.body,
                        author : req.body.author}

 return dataPostCommentByArticleId(postCommentId).then((resPost) => {
     return res.status(201).send({postCommentById: resPost})
 	
 })
} 



module.exports = {getTopics,getArticles,getArticleById,getCommentsArticle,
               postCommentByArticleId,
             }