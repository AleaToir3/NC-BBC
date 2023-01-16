const express = require('express');
const {getTopics,} = require('./controllers');


const app = express();

app.use(express.json());

app.get("/api/topics",getTopics);







app.listen(8080, () => {});

module.exports = app;