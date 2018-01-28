(function() {
    angular.module('app').controller('mainCtrl', function($scope, $state, APIService, isAuthenticated) {
        $scope.initiateLogin = function() {
            var data = {
                "emailId": $scope.emailId,
                "password": $scope.password
            }
            $scope.successMsg = '';
            $scope.errorMsg = '';
            APIService.authentication(data, "LOGIN").then(function(response) {
                console.log("Response", response)
                if (response && response.data && (response.data.message === "Wrong password." || response.data.message === "User doesn't exisit. Please register to continue.")) {
                    $scope.errorMsg = response.data.message;
                } else {
                    localStorage.setItem('hash', response.data.token);
                    localStorage.setItem('data', JSON.stringify(response.data.data));
                    $state.go('dashboard');
                }
            }, function(error) {
                console.log("Controllererror", error)
                $scope.errorMsg = error.data.message;
            })
        };
    })
}())