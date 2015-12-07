angular.module('parkingApp.controllers', [])
    .controller("mainController", function($scope, $http, transformRequestAsFormPost, $state) {
        // console.log("In mainController");
        var vehicliesListFlag = 1;
        var slotId;
        $scope.getSession = function() {
            $http({
                method: 'GET',
                url: '/getSession'
            }).then(function(res) {
                if (res.data) {

                    $scope.sessionVar = res.data;
                    $scope.UserName = res.data.displayName;
                    $scope.email = res.data.email;
                    if (res.data.userType === 'ADMIN') {
                        $scope.userTypes = 1;
                    }
                }
            });
        };

        $scope.getSession();

        $scope.userLogout = function() {
            $http({
                method: 'GET',
                url: '/logout'
            }).then(function(res) {
                $scope.sessionVar = res.data;
                $scope.userTypes = 0;
                $scope.loginAuthFlag = 0;
                $scope.email = null;
                var vehiclesListLength = $scope.vehiclesList.length;
                $scope.vehiclesList.splice(0, vehiclesListLength);
            });
        };

        $scope.userValidate = function(user) {

                $http({
                        method: 'POST',
                        url: '/verifyuser',
                        transformRequest: transformRequestAsFormPost,
                        data: {
                            email: user.userEmail,
                            password: user.userPassword
                        }
                    })
                    .then(function successCallback(response, responseCode) {
                        if (response.data.result) {
                            $scope.loginAuthFlag = 0;
                            /* To view the admin related options*/
                            if (response.data.userType === 'ADMIN') {
                                $scope.userTypes = 1;
                            }
                            $state.go('register');
                            $scope.UserName = response.data.userName;
                            $scope.email = response.data.userEmail;
                        } else {
                            $scope.loginAuthFlag = 1;
                        }
                    }, function errorCallback(error) {

                    });
            } //end of userValidate
        $scope.SignUpForm = {
            password_confirmation: '',
            password: ''
        };

        $scope.signUp = function(userModel) {

                $http({
                    method: 'POST',
                    url: '/insertuser',
                    transformRequest: transformRequestAsFormPost,
                    data: {
                        first_name: userModel.first_name,
                        last_name: userModel.last_name,
                        display_name: userModel.display_name,
                        email: userModel.email,
                        password: userModel.password,
                        license_num: userModel.license_num
                    }
                }).then(function successCallback(response, responseCode) {
                    if (response.data.result) {
                        $state.go('success');
                    }
                }, function errorCallback(error) {

                });
            } //end of sugnUp
        $scope.getParkingZoneNames = function() {
                $http({
                        method: 'POST',
                        url: '/getparkingzone',
                        data: {}
                    })
                    .then(function successCallback(response, responseCode) {
                        if (response.data.result) {
                            $scope.zones = response.data.zones;
                        }
                    }, function errorCallback(error) {

                    });
            } //end of getParkingZoneNames
        $scope.slotDetails = [{

        }];

        $scope.changedValue = function(someValue) {
                $scope.bookingFlag = 0;
                if (someValue != null) {

                    var length = $scope.slotDetails.length;
                    $scope.slotDetails.splice(1, length); // To flush the previous values in the array
                    $http({
                            method: 'POST',
                            url: '/getslots',
                            data: {
                                slotName: someValue.slotName
                            }
                        })
                        .then(function successCallback(response, responseCode) {
                            if (response.data.result) {
                                $scope.slotDetails = [];
                                angular.forEach(response.data.slots, function(slot) {
                                    $scope.slotDetails.push({
                                        slotId: slot.slotId,
                                        slotStatus: slot.slotStatus
                                    });
                                    //console.log($scope.slotDetails[].slotId);
                                });
                                //console.log(response.data.slots);
                            }
                        }, function errorCallback(error) {

                        });
                    //for getting the count of Available slots
                    $http({
                            method: 'POST',
                            url: '/getAvailableSlotCount',
                            data: {
                                zoneName: someValue.slotName
                            }
                        })
                        .then(function successCallback(response, responseCode) {
                            if (response.data.result) {
                                $scope.count = response.data.slotsAvailableCount;
                            }
                        }, function errorCallback(error) {

                        });

                } //end of if

            } //end of changedValue

        $scope.slotClick = function(slot) {
            if (slot.slotStatus == 'Available') {
                $scope.slotId = slot.slotId;
                $scope.bookingFlag = 1;
                if (vehicliesListFlag) {
                    $http({
                            method: 'POST',
                            url: '/getVehicles',
                            data: {
                                userEmail: $scope.email
                            }
                        })
                        .then(function successCallback(response, responseCode) {
                            if (response.data.result) {
                                $scope.vehiclesList = response.data.vehiclesList;
                                vehicliesListFlag = 0;
                            }

                        }, function errorCallback(error) {

                        });
                }

            } else {
                $scope.disableSlot(slot.slotId);
                $scope.bookingFlag = 0;
            }

        };

        $scope.bookSlot = function() {
            // console.log("In bookSlot");


        };

        $scope.disableSlot = function() {
            // console.log("In disableSlot");

        };
        //adding new vehicle to db
        $scope.addVehicle = function(someVehicle) {

            if (someVehicle != null) {
                $http({
                        method: 'POST',
                        url: '/addvehicle',
                        data: {
                            vehicleNum: someVehicle,
                            email: $scope.email
                        }
                    })
                    //update the new vehicle in the list
                    .then(function successCallback(response, responseCode) {
                        if (response.data.result) {
                            console.log($scope.email);
                            $http({
                                    method: 'POST',
                                    url: '/getVehicles',
                                    data: {
                                        userEmail: $scope.email
                                    }
                                })
                                .then(function successCallback(response, responseCode) {
                                    if (response.data.result) {
                                        $scope.vehiclesList = response.data.vehiclesList;
                                        vehicliesListFlag = 0;
                                        $scope.userVehicle = '';
                                    }

                                }, function errorCallback(error) {

                                });
                        }
                    }, function errorCallback(error) {

                    });

            }
        }
        $scope.proceedBooking = function(someValue) {
                console.log(someValue.fromDate.toLocaleDateString(), someValue.fromTime.toLocaleTimeString(), someValue.userVehicles.vehicleNum);
                //console.log($scope.email);
                $state.go('register.booking_confirmation');
                $scope.vehicleNum = someValue.userVehicles.vehicleNum;
                $scope.vehicleMake = someValue.vehicleMake;
                $scope.vehicleModel = someValue.vehicleModel;
                $scope.from = someValue.fromDate.toLocaleDateString() + ' ' + someValue.fromTime.toLocaleTimeString();
                $scope.to = someValue.toDate.toLocaleDateString() + ' ' + someValue.toTime.toLocaleTimeString();
                $scope.Price = 5;
                $scope.Days = someValue.toDate.getDate() - someValue.fromDate.getDate();
                $scope.Hours = someValue.toTime.getHours() - someValue.fromTime.getHours();
                if ($scope.Days == 0) {
                    $scope.Cost = $scope.Hours * $scope.Price;
                    $scope.Duration = $scope.Hours + ' Hour/s';
                    $scope.uniqueNumber1 = $scope.uniqueNumber();
                } else {
                    //if($scope.Hours)
                    $scope.Cost = ((($scope.Days * 24) + $scope.Hours) * $scope.Price);
                    $scope.Duration = (($scope.Days * 24) + $scope.Hours) + ' Hours'; //$scope.Days +' Days '+$scope.Hours+' Hours';
                    $scope.uniqueNumber1 = $scope.uniqueNumber();
                }

                $http({
                        method: 'POST',
                        url: '/bookSlot',
                        data: {
                            slotId: $scope.slotId
                        }

                    })
                    .then(function successCallback(response, responseCode) {
                        if (response.data.result) {
                            //console.log("Success");
                            $http({
                                    method: 'POST',
                                    url: '/insertParkingSlip',
                                    data: {
                                        idParkingSlip: $scope.uniqueNumber1,
                                        email: $scope.email,
                                        vehicleNum: someValue.userVehicles.vehicleNum,
                                        fromDate: someValue.fromDate.getFullYear() + '-' + (someValue.fromDate.getMonth() + 1) + '-' + someValue.fromDate.getUTCDate(),
                                        fromTime: someValue.fromTime.getHours() + ':' + someValue.fromTime.getUTCMinutes() + ':00',
                                        slotId: $scope.slotId,
                                        toDate: someValue.toDate.getFullYear() + '-' + (someValue.toDate.getMonth() + 1) + '-' + someValue.toDate.getUTCDate(),
                                        toTime: someValue.toTime.getHours() + ':' + someValue.toTime.getUTCMinutes() + ':00'
                                    }
                                })
                                .then(function successCallback(response, responseCode) {
                                    if (response.data.result) {
                                        console.log("parking slip inserted successfully");
                                    } //end of if
                                }, function errorCallback(error) {

                                }); //end of errorCallback
                        } //end of if
                    }, function errorCallback(error) {

                    });
            }
            //after booking a slot
        $scope.confirmSlot = function() {
                $state.go('register.user_home');
                //console.log("booked successfully");
            }
            //to generate a unique reference number
        $scope.uniqueNumber_previous = 0;
        $scope.uniqueNumber = function() {
                date = Date.now();
                // If created at same millisecond as previous
                if (date <= $scope.uniqueNumber_previous) {
                    date = ++$scope.uniqueNumber_previous;
                } else {
                    $scope.uniqueNumber_previous = $scope.date;
                }
                return date;
            }
            //to pull the user bookings
        $scope.getUserParkings = function() {
            //console.log($scope.email);
            $http({
                method: 'POST',
                url: '/getUserParkingHistory',
                data: {
                    email: $scope.email
                }
            }).then(function successCallback(response, responseCode) {
                    if (response.data.result) {
                        $scope.parkings = response.data.parkings;
                    }

                },
                function errorCallback(error) {

                }); //end of getUserParkings
        }
        $scope.checkOut = function(item) {
            $scope.item=item;
            $http({
                method: 'POST',
                url: '/freeSlot',
                data: {
                    slotId: item.slotId
                }
            }).then(function successCallback(response, responseCode) {
                    if (response.data.result) {
                        console.log("Slot is free now");
                        // var string=$scope.item.idParkingSlip;
                        // $scope.flag="flag_"+string;
                        // $scope.flag="True";
                    }

                },
                function errorCallback(error) {


                });
        }

    });
