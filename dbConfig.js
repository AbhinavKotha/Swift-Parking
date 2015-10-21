var path = require('path');
var mysql=require('mysql');
	var connection=mysql.createConnection({
	host 		  : 	'localhost',
	user		  :    'root',
	password  :    'Toast*123',
	database  : 	 'swift_parking'
	});
	connection.connect(function(err){
		if(!err) {
		    console.log("Database is connected ... \n\n");  
		} 
		else {
		    console.log("Error connecting database ... \n\n");  
		}
	});

module.exports=connection;  //expose connection to other controllers

