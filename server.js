var express=require("express");
var app=express();
var mysql=require('mysql');
app.use(express.static(__dirname + '/public'));
var port=process.env.PORT || '9090';
var connection=mysql.createConnection({
	host 		: 	'localhost',
	user		:    'root',
	password    :    'Toast*123',
	database	: 	 'swift_parking'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});

app.get("/getuser",function(req,res){
connection.query('SELECT * from regUsers',  function(err, rows, fields) {
connection.end();
  if (!err)
    res.send('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  });

});

app.get("*",function(req,res){
	res.sendfile('./public/index.html');
});

//var port=process.env.PORT || 9090; //customized port number\

app.listen(port);
console.log("Hurray Swift Parking is up & listening on:"+port);