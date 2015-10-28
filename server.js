var express=require("express");
var app=express();
var mysql=require('mysql');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var port=process.env.PORT || '9090';
app.use(express.static(__dirname + '/public'));
// routes ==================================================

// db Config ===============================================
require('./dbConfig');
//var port=process.env.PORT || 9090; //customized port number\
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
    extended: true
})); // parse application/x-www-form-urlencoded

require('./routes')(app);
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.listen(port);
console.log("Hurray Swift Parking is up & listening on:"+port);
exports = module.exports = app; // expose app