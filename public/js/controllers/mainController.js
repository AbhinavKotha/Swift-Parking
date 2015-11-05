angular.module('parkingApp.controllers', [])
    .controller("mainController", function($scope,$http,transformRequestAsFormPost,$state) {
        // console.log("In mainController");
        $scope.userValidate = function(user) {

        	$http({
        		method: 'POST',
        		url: '/verifyuser',
        		transformRequest: transformRequestAsFormPost,
        		data: {
        			email:user.userEmail,
        			password:user.userPassword
        		}
        	})
        	.then(function successCallback(response, responseCode) {
                if (response.data.result) {
                    $state.go('register');
                }
            }, function errorCallback(error) {

            });
            //console.log("user.userEmail");
        }

        $scope.SignUpForm={
        	password_confirmation: '',
        	password : ''
        };

        $scope.signUp = function(userModel) {
    
            $http({
                method: 'POST',
                url: '/insertuser',
                transformRequest: transformRequestAsFormPost,
                data: {
                    first_name: userModel.first_name,
                    last_name: userModel.last_name,
                    display_name:userModel.display_name,
                    email:userModel.email,
                    password:userModel.password,
                    license_num:userModel.license_num
                }
            }).then(function successCallback(response, responseCode) {
                if (response.data.result) {
                    $state.go('success');
                }
            }, function errorCallback(error) {

            });
        }
    });
