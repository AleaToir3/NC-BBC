const {dataGetTopics,dataGetArticles} = require("./models")

// TASK 3
const getTopics = ()=>{
 return dataGetTopics(req,res).then(
     (datatopics) => {
         res.status(200).send({topics: datatopics})
     }
 )
;}
// TASK 4
const getArticles = ()=>{
 return dataGetArticles(req,res).then(
     (dataArticles)=>{
         res.status(200).send({articles: dataArticles})
     }
 )
}
module.exports = {getTopics,getArticles}

