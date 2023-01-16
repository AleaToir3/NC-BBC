const {dataGetTopics} = require("./models")


const getTopics = (req,res)=>{

    return dataGetTopics(req,res).then(
        (datatopics) => {
            res.status(200).send(datatopics)
        }
    )

;}

module.exports = {getTopics}