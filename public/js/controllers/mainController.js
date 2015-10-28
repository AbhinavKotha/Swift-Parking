angular.module('parkingApp.controllers',[])
.controller("mainController",function($scope){
 	console.log("In mainController");
 	$scope.userValidate=function(){
 		console.log("clicked userValidate");
 	}

});
