angular.module('parkingApp', ['ui.router',
    'parkingApp.controllers',
    'parkingApp.directives',
    'parkingApp.services'
])

.config(function($stateProvider, $urlRouterProvider) {
    //

    // Now set up the states
    $stateProvider
        .state('/', {
            url: "/",
            // onEnter:function(scope,state){
            //     if(scope.sessionVar){

            //     }
            //     else{
            //         state.go('/');
            //     }
            // }
            views: {
                'main-section': {
                    templateUrl: "views/landPage.html"
                        //template:"Hello"
                }
            }
        }).state('register', {
            url: "/register",
            views: {
                'main-section': {
                    templateUrl: "views/regUsers.html"
                }
            }
        })
        .state('register.user_home', {
            url: "/user_home",
            views: {
                'user-section': {
                    template: "User Home"
                }
            }
        })
        .state('register.user_book', {
            url: "/user_book",
            views: {
                'user-section': {
                    templateUrl: "views/slotBooking.html"
                }
            }
        })
        .state('user_logout',{
            url: "/logout",
            views: {
                'main-section': {
                    templateUrl: "views/landPage.html"
                }
            }
        })
        .state('success',{
            url: "/success",
            views: {
                'main-section': {
                    templateUrl: "views/landPage.html"
                }
            }
        });


    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //

});
