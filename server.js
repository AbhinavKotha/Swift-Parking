var express=require("express");
var app=express();
var mysql=require('mysql');
app.use(express.static(__dirname + '/public'));
var port=process.env.PORT || '9090';
// routes ==================================================
require('./routes')(app);
// db Config ===============================================
require('./dbConfig');
//var port=process.env.PORT || 9090; //customized port number\

app.listen(port);
console.log("Hurray Swift Parking is up & listening on:"+port);
exports = module.exports = app; // expose app