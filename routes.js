    var path = require('path');
    var connection = require('./dbConfig');
    // server routes ===========================================================
    // handle things like api calls
    module.exports = function(app) {
        app.post("/getuser", function(req, res) {
            console.log(req.body);

            connection.query('SELECT * from regusers WHERE email =?', [req.body.username], function(err, rows, fields) {

                if (!err) {

                    //res.send('The Solution is: '+rows[0].fName);
                    if (rows.length) {

                        res.json({
                            'result': 1
                        });
                    }else{
                      res.json({
                            'result': 0
                        });
                    }
                } else {
                    console.log('Error while performing Query.');
                }
            });
        });

        // frontend routes =========================================================
        // route to handle all other angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html');
        });
    }
