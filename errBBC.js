
const  errBadRequest = (err,req,res,next) => {
    console.log("🚨🔥====errBBC===== err", err);
    if(err.code === "22P02"){ 
     res.status(400).send("400, invalid ID")
    }else{
        res.status(404).send("404, NON existent ID")
     }
}

const  errTopics = (err,req,res,next)=>{

}

const  errComments = (err,req,res,next)=>{

}

module.exports = {
    errBadRequest,
    errTopics,
    errComments}