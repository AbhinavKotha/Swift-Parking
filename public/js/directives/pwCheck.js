angular.module('parkingApp.directives', [])
    .directive('pwCheck', [function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope:{
                models : '=pwCheckModels'
            },
            link: function(scope, elem, attrs, ctrl) {

                var me = attrs.ngModel;
                var matchTo = attrs.pwCheck;
                
                //console.log(me+" ,"+matchTo);
                scope.$watch('models',function(newVal){
                    if(typeof newVal.password !== 'undefined'){
                        ctrl.$setValidity('pwmatch', scope.models['password'] === scope.models['password_confirmation'] );
                    }
                },true);
            }
        }
    }]);