app.controller('viewBookingController', ['$scope','listOfItem', function ($scope, listOfItem) {
    $scope.values = listOfItem.get();
    console.log($scope.values.length);
}]);

