const db = require("./db/connection")

const dataGetTopics = () =>{
 return db.query(`SELECT * FROM topics`).then((topics)=>{
    return topics.rows
 })
}











module.exports = {
    dataGetTopics,
   
 } 

