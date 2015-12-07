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
        /* Flushes the session data after logout */
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
                            'userType': rows[0].userType,
                            'userEmail': rows[0].email
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
        app.post("/getVehicles", function(req, res) {
            connection.query('SELECT vehicleNum from vehicledestails where email=?', [req.body.userEmail], function(err, rows, fields) {
                if (!err) {
                    if (rows.length) {
                        res.json({
                            'result': 1,
                            'vehiclesList': rows
                        });
                    } //end of if
                    else {
                        res.json({
                            'result': 0
                        });
                    }

                } //end of if(!err)
                else {
                    console.log('Error while performing Query.');
                }
            });
        });
        app.post("/addvehicle", function(req, res) {
            connection.query('INSERT into vehicledestails(email,vehicleNum) values(?,?)', [req.body.email, req.body.vehicleNum], function(err, record) {
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
            });
        });
        //to insert booking information
        app.post("/bookSlot", function(req, res) {
            console.log(req.body.slotId);
            connection.query('UPDATE parking_slots SET slotStatus=? where slotId=?', ['Booked', req.body.slotId], function(err, record) {
                if (!err) {
                    res.json({
                        'result': 1
                    }); //end of res.json 

                } //end of if update query 
                else {
                    res.json({
                        'result': 0
                    });
                    console.log('Error while updating record.');
                }
            });
            //connection.query('update parking_slots SET slotStatus=? where slotId=?',[Booked,req.body.slotId],function(err,record){

        });
        //});
        app.post("/insertParkingSlip", function(req, res) {
            
            connection.query('INSERT into parkingslip(idParkingSlip,email,vehicleNum,fromDate,fromTime,slotId,toDate,toTime) values(?,?,?,?,?,?,?,?)', [req.body.idParkingSlip, req.body.email, req.body.vehicleNum, req.body.fromDate, req.body.fromTime, req.body.slotId, req.body.toDate, req.body.toTime], function(err, record) {
                if (!err) {
                    res.json({
                        'result': 1
                    });
                } // end of if insert query
                else {
                    res.json({
                        'result': 0
                    });
                    console.log('Error while inserting record.');
                }
            }); //end of function
        });
        app.post("/getUserParkingHistory",function(req,res){
            connection.query('SELECT * FROM parkingslip WHERE email=?',[req.body.email],function(err,rows,fields){
                if(!err){
                    res.json({
                        'result':1,
                        'parkings': rows
                    });
                }
                else{
                    res.json({
                        'result':0
                    });
                    console.log('Error while performing query');
                }
            });//end of function
        });//end of getUserParkingHistory
        app.post("/freeSlot",function(req,res){
            connection.query('UPDATE parking_slots SET slotStatus=? where slotId=?',['Available',req.body.slotId],function(err,record){
                if(!err){
                    res.json({
                        'result':1
                    });
                }
                else{
                    res.json({
                        'result':0
                    });
                    console.log("Error while updating table");
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
