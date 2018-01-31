(function() {
    angular.module('app').controller('dashboardCtrl', function($scope, $state, isAuthenticated) {
        console.log("Is Authenticated", isAuthenticated);

        $scope.logout = function() {
            localStorage.clear();
            $state.go('login');
        }

        function init() {
            var user = JSON.parse(localStorage.getItem('data'));
            $scope.id = user.id;
            $scope.name = user.name;
            $scope.emailId = user.emailId;
            $scope.mobileNumber = user.mobileNumber;
        }
        init();
    })
}());