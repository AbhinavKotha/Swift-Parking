angular.module('parkingApp.controllers', [])
	.controller("parkingZonesController",function($scope,$http,transformRequestAsFormPost,$state){
		$scope.parkingZones=[]
		$scope.getParkingZoneNames=function()
		{
			$http({
        		method: 'get',
        		url: '/getparkingzone',
        		transformRequest: transformRequestAsFormPost,
        	})
        	.then(function successCallback(response, responseCode) {
                if (response.data.result) {
                    //$state.go('register');
                    Console.log("Sucess");
                    
                }
            }, function errorCallback(error) {

            });
		}

	});