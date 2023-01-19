const {dataGetTopics} = require("./models")

// TASK 3
const getTopics = ()=>{
    return dataGetTopics(req,res).then(
        (datatopics) => {
            res.status(200).send({topics: datatopics})
        }
    )
;}

module.exports = {getTopics}
