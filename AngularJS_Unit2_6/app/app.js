// Initialize the AngularJS application
var app = angular.module('myApp', ['ngRoute']);

app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.sample = "data"
    // Your home controller logic goes here
}]);

// Configure the routes
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/view/home.html',
            controller: 'homeController'
        })
        .otherwise({ redirectTo: '/home' });
    console.log($routeProvider);

}]);
