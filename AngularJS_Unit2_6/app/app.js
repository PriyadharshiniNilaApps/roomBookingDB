// Initialize the AngularJS application
var app = angular.module('myApp', ['ngRoute']);

app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.sample = "data"
    // Your home controller logic goes here
}]);

app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');


}]);
// Configure the routes
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/login', {
            templateUrl: 'app/view/login.html',
            controller: 'loginController'
        })
        
        .when('/register', {
            templateUrl: 'app/view/register.html',
            controller: 'registerController'
        })
        .when('/home', {
            templateUrl: 'app/view/home.html',
            controller: 'homeController'
        })
        .otherwise({ redirectTo: '/login' });
    console.log($routeProvider);

}]);
