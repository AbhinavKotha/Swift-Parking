angular.module('parkingApp.controllers', [])
    .controller("mainController", function($scope,$http,transformRequestAsFormPost) {
        // console.log("In mainController");
        $scope.userValidate = function() {
            console.log("clicked userValidate");
        }

        $scope.SignUpForm={
        	password_confirmation: '',
        	password : ''
        };

        $scope.signUp = function(userModel) {

            console.log("Clicked on Register");
		// console.log(userModel.first_name, userModel.last_name);
            
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
                    $state.go('/success');
                    //response.send("success");
                }
            }, function errorCallback(error) {

            });
        }
    });
