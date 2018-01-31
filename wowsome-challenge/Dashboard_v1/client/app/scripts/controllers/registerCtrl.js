(function() {
    angular.module('app').controller('registerCtrl', function($scope, $state, APIService) {
        $scope.successMsg = '';
        $scope.errorMsg = '';
        $scope.registerUser = function() {
            var data = {
                "emailId": $scope.emailId,
                "password": $scope.password,
                "mobileNumber": $scope.mobileNumber,
                "name": $scope.name
            }
            $scope.successMsg = '';
            $scope.errorMsg = '';
            APIService.authentication(data, "REGISTER").then(function(response) {
                console.log("Response", response)
                if (response && response.data && response.data.status === 400) {
                    $scope.errorMsg = response.data.message;
                } else if (response && response.data && response.data.status === 200) {
                    $scope.successMsg = response.data.message;
                    resetFields();
                }
            }, function(error) {
                console.log("Controllererror")
            })
        }


        function resetFields() {
            $scope.emailId = '';
            $scope.password = '';
            $scope.mobileNumber = '';
            $scope.name = '';
        }
    })
}())