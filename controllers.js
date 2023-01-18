const {dataGetTopics,} = require("./models")

// TASK 3
const getTopics = (req,res)=>{
    return dataGetTopics(req,res).then(
        (datatopics) => {
            res.status(200).send({topics: datatopics})
        }
    )
;}



module.exports = {getTopics,
                }