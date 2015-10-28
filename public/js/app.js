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
                    templateUrl: "regUsers.html"
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
                    template: "User Book"
                }
            }
        });



    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //

});
