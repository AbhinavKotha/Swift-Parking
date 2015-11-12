angular.module('parkingApp.controllers', [])
    .controller("mainController", function($scope, $http, transformRequestAsFormPost, $state) {
        // console.log("In mainController");
        $scope.getSession = function() {
            $http({
                method: 'GET',
                url: '/getSession'
            }).then(function(res) {
                if (res.data) {

                    $scope.sessionVar = res.data;
                    $scope.UserName = res.data.fName;
                    if(res.data.userType==='ADMIN'){
                        $scope.userTypes=1;
                    }
                }
            });
        };

        $scope.getSession();

        $scope.userLogout=function(){
            $http({
                method: 'GET',
                url: '/logout'
            }).then(function(res){
                $scope.sessionVar=res.data;
                $scope.userTypes=0;
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
                            $state.go('register');
                            $scope.UserName = response.data.userName;

                        }
                        /* To view the admin related options*/
                        if (response.data.userType === 'ADMIN') {
                            $scope.userTypes = 1;
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
                        dat: {}
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

            } //end of changedValue

        $scope.slotClick = function(slot) {
            if (slot.slotStatus == 'Available') {
                $scope.bookSlot(slot.slotId);
            } else {
                $scope.disableSlot(slot.slotId);
            }

        };

        $scope.bookSlot = function() {
            console.log("In bookSlot");

        };

        $scope.disableSlot = function() {
            console.log("In disableSlot");
        };

    });
