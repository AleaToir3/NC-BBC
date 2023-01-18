const express = require('express');
const {getTopics} = require('./controllers');


const app = express();

app.use(express.json());
// ==================   GET   ==================
       //  -----    3    ------
app.get("/api/topics",getTopics);

module.exports = app;