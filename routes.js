    var path = require('path');
    var connection=require('./dbConfig');
    // server routes ===========================================================
    // handle things like api calls
    module.exports=function(app){
    	app.get("/getuser",function(req,res){
		connection.query('SELECT * from regusers',  function(err, rows, fields) {

  			if (!err)
    			res.send('The Solution is: '+rows[0].fName);
  			else
    			console.log('Error while performing Query.');
  		});
	});
    
	    // frontend routes =========================================================
	    // route to handle all other angular requests
	    app.get('*', function(req, res) {
	        res.sendfile('./public/index.html');
	    });
    }    
    
    
