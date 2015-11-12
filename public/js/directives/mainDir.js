angular.module('parkingApp.directives', [])
    .directive('mainDir', function($state, $http, transformRequestAsFormPost) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
               /*add the function to add a css class to html image element*/

                element.find('.btn-login').on('click', function() {
                    var str_email = $('#exampleInputEmail1').val();
                    var str_passw = $('#exampleInputPassword1').val();
                    $http({
                        method: 'POST',
                        url: '/getuser',
                        transformRequest: transformRequestAsFormPost,
                        data: {
                            username: str_email,
                            password: str_passw
                        }
                    }).then(function successCallback(response, responseCode) {
                        if (response.data.result) {
                            $state.go('register');
                        }
                    }, function errorCallback(error) {

                    });
                });
            }
        }
    });
