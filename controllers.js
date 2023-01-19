const {dataGetTopics,dataGetArticles} = require("./models")

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
     (dataArticles)=>{
         res.status(200).send({articles: dataArticles})
     }
 )
}
module.exports = {getTopics,getArticles}

