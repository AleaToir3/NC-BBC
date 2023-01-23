const column = ["article_id","title","topic","author","body","created_at","votes","article_img_url"];


allo = "prout"
oui = "article_id"

test = column.filter((e)=>{return e==oui}) 

if(test.length > 0){
    console.log(typeof(test[0]))
}
// console.log("🚨🔥  file: test.js:8  alors", alors);


