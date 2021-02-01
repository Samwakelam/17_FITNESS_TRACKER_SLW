const express = require('express');
const path = require('path');

const app = express();


app.get('/exercise', function(req, res){
    console.log("htmlRoutes.js get/exercise req.body =", req.body);
    
    res.sendFile(path.join(__dirname,'../public/exercise.html'));
});

app.get('/stats', function(req, res){
    console.log("htmlRoutes.js get/stats req.body =", req.body);
    
    res.sendFile(path.join(__dirname,'../public/stats.html'));
});

app.get('/', function(req, res){
  console.log("htmlRoutes.js get/ req.body =", req.body);
  
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

module.exports = app;