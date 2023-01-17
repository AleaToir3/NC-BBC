const {dataGetTopics,dataGetArticles,dataGetArticleById} = require("./models")

// TASK 3
const getTopics = (req,res)=>{

    return dataGetTopics(req,res).then(
        (datatopics) => {
            res.status(200).send({datatopics})
        }
    )

;}
// TASK 4
const getArticles = (req,res)=>{
    return dataGetArticles(req,res).then(
        (dataArticles)=>{
            res.status(200).send(dataArticles)
        }
    )
}
// TASK 5
const getArticleById = (req,res)=>{
    const  articleId = req.params.article_id 

    return dataGetArticleById(articleId)
    .then(
        (article) => {
            res.status(200).send(article.rows)
        }
    )
}
// TASK 6
 const getCommentByArticleId = (req,res)=>{
    const commentArticleId = req.params.article_id
    return dataGetCommentByArticleId(commentArticleId).then((resultCommentArticleById)=>{
        res.status(200).send(resultCommentArticleById.rows)
    })
 }

// TASK 7



module.exports = {getTopics,getArticles,getArticleById,getCommentByArticleId}