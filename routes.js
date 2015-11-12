    var path = require('path');
    var session = require('express-session');
    var connection = require('./dbConfig');
    // server routes ===========================================================
    // handle things like api calls
    module.exports = function(app) {
        var sessionVar;
        app.use(session({
            secret: 'ssshhhhh2',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }));

        app.get("/getSession", function(req, res) {
            res.json(sessionVar);
        });

        app.get("/logout", function(req, res) {
            sessionVar = null;
            res.json(sessionVar);
        });
        app.post("/verifyuser", function(req, res) {

            connection.query('SELECT * from regusers WHERE email =? AND password =?', [req.body.email, req.body.password], function(err, rows, fields) {

                if (!err) {

                    //res.send('The Solution is: '+rows[0].fName);
                    if (rows.length) {
                        sessionVar = rows[0];
                        res.json({
                            'result': 1,
                            'userName': rows[0].displayName,
                            'userType': rows[0].userType
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
            connection.query('INSERT INTO regusers(fName,lName,displayName,email,password,licenseNum) VALUES(?,?,?,?,?,?)', [req.body.first_name, req.body.last_name, req.body.display_name, req.body.email, req.body.password, req.body.license_num], function(err, record) {
                if (!err) {
                    res.json({
                        'result': 1
                    });
                } else {
                    res.json({
                        'result': 0
                    });
                    console.log('Error while inserting record.');
                }
                //console.log(record);
            });

        });
        app.post("/getparkingzone", function(req, res) {
            //$scope.zones=[];
            connection.query('SELECT DISTINCT slotName from parking_slots', function(err, rows, fields) {
                if (!err) {
                    if (rows.length) {
                        res.json({
                            'result': 1,
                            'zones': rows
                        });

                    } // end of rows.length
                    else {
                        res.json({
                            'result': 0
                        });
                    }

                } //end of !err              
                else {
                    console.log("Error while performing Querry.");
                }

            });
        });
        app.post("/getslots", function(req, res) {
            connection.query('SELECT * from parking_slots where slotName=?', [req.body.slotName], function(err, rows, fields) {
                if (!err) {

                    //res.send('The Solution is: '+rows[0].fName);
                    if (rows.length) {

                        res.json({
                            'result': 1,
                            'slots': rows
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
        app.post("/getAvailableSlotCount", function(req, res) {
            connection.query('SELECT COUNT(slotStatus) as slotsAvailableCount from parking_slots where slotName=? AND slotStatus=?', [req.body.zoneName, 'Available'], function(err, rows, fields) {
                if (!err) {

                    //res.send('The Solution is: '+rows[0].fName);
                    if (rows.length) {

                        res.json({
                            'result': 1,
                            'slotsAvailableCount': rows[0].slotsAvailableCount
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
        //})
        // frontend routes =========================================================
        // route to handle all other angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html');
        });
    }
