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
                    } else {
                        res.json({
                            'result': 0
                        });
                    }
                } else {
                    console.log('Error while performing Query.');
                }
            });
        });

        app.post("/insertuser", function(req, res) {
                connection.query('INSERT INTO regusers(fName,lName,displayName,email,password,licenseNum) VALUES(?,?,?,?,?,?)',[req.body.first_name,req.body.last_name,req.body.display_name,req.body.email,req.body.password,req.body.license_num],function(record,err){
                    if(!err) {
                        res.json({
                            'result':1
                        });
                    }else{
                        res.json({
                            'result':0
                        });
                        console.log('Error while inserting record.');
                    }
                    //console.log(record);
                });

            });
        //})
    // frontend routes =========================================================
    // route to handle all other angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
    }
