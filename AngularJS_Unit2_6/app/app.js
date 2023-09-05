// Initialize the AngularJS application
var app = angular.module('myApp', ['ngRoute']);

app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

// Configure the routes
app.config(['$routeProvider', function ($routeProvider) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ed8b1ab5dcd04ef535662714871eab792c1e396d
  $routeProvider
  .when('/login', {
          templateUrl: 'app/view/login.html',
          controller: 'loginController'
      })
      
      .when('/register', {
          templateUrl: 'app/view/register.html',
          controller: 'registerController'
      })
    
      .when('/roomBooking',{
          templateUrl: 'app/view/roomBooking.html',
          controller: 'roomBookingController'
      })
<<<<<<< HEAD

      .when('/home', {
          templateUrl: 'app/view/home.html',
          controller: 'homeController'
      })
      .when('/availability', {
          templateUrl: 'app/view/availabilityTemplate.html',
          controller: 'availabilityController'
      })
      .when('/viewBooking',{
        templateUrl: 'app/view/viewBooking.html',
        controller: 'viewBookingController'
      })
      .otherwise({ redirectTo: '/login' });
  console.log($routeProvider);

=======

      .when('/home', {
          templateUrl: 'app/view/home.html',
          controller: 'homeController'
      })
      .when('/availability', {
          templateUrl: 'app/view/availabilityTemplate.html',
          controller: 'availabilityController'
      })
      .when('/viewBooking',{
        templateUrl: 'app/view/viewBooking.html',
        controller: 'viewBookingController'
      })
      .otherwise({ redirectTo: '/login' });
  console.log($routeProvider);

>>>>>>> ed8b1ab5dcd04ef535662714871eab792c1e396d
}]) 

app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.sample = "data";
    localStorage.clear()

}])




.service('listOfItem', function(){
  var listOfItem = [];
  listOfItem.push({
    'index':1,
    'fullname':'Priyadharshini ',
    'email': 'priyadharshini@gmail.com',
    'roomtype': 'AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
  
  },
  {'index':2,
    'fullname':'Edward',
    'email': 'ed@gmail.com',
    'roomtype': 'Non-AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
    
  
  },
  {
    'index':3,
    'fullname':'Shreya',
    'email': 's@gmail.com',
    'roomtype': 'AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
    
  
  },
  {
    'index':4,
    'fullname':'Kundavai',
    'email': 'kundavai@gmail.com',
    'roomtype': 'AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
    
  
  },
  {
    'index':5,
    'fullname':'dharshini ',
    'email': 'dharshini@gmail.com',
    'roomtype': 'AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
    
  
  },{
    'index':1,
    'fullname':'Priyadharshini ',
    'email': 'priyadharshini@gmail.com',
    'roomtype': 'AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
  
  },
  {'index':2,
    'fullname':'Edward',
    'email': 'ed@gmail.com',
    'roomtype': 'Non-AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
    
  
  },
  {
    'index':3,
    'fullname':'Shreya',
    'email': 's@gmail.com',
    'roomtype': 'AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
    
  
  },
  {
    'index':4,
    'fullname':'Kundavai',
    'email': 'kundavai@gmail.com',
    'roomtype': 'AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
    
  
  },
  {
    'index':5,
    'fullname':'dharshini ',
    'email': 'dharshini@gmail.com',
    'roomtype': 'AC',
    'age': 23,
    'roomSize': '2',
    'view':'app/style/images/view.svg'
    
  
  });
  this.values = function(value){
      listOfItem.push(value);
  }

  this.get =function(){
  return listOfItem;
}

})
  //Custom Directive for adding a class when the input element if not valid
.directive('errorClass', function() {
    return {
      restrict: 'A',
      require: 'ngModel', 
      link: function(scope, element, attrs, ngModelCtrl) {
        scope.$watch(function() {
          return !ngModelCtrl.$valid && ngModelCtrl.$touched;
        },function(newVal) {
          if (newVal) {
            element.addClass('validation-error-input');
            element.addClass('placeholder-color')
          } else {
            element.removeClass('validation-error-input');
            element.removeClass('placeholder-color')
          }
        });
      }
    };
  })
  
  //Custom Directive for adding a class when the select element if not valid
  .directive('errorClassSelect', function() {
    return {
      restrict: 'A',
      require: 'ngModel', 
      link: function(scope, element, attrs, ngModelCtrl) {
        scope.$watch(function() {
          return !ngModelCtrl.$valid && ngModelCtrl.$touched;
        }, function(newVal) {
          if (newVal) {
            element.addClass('validation-error-select');
          element.addClass('placeholder-color')
          } else {
            element.removeClass('validation-error-select');
          element.removeClass('placeholder-color')
          }
        });
      }
    };
  })

  //Custom Directive for displaying error text if the input field is empty
.directive('errorText', function() {
    return {
      restrict: 'C',
      require: '^ngModel', 
      link: function(scope, element, attrs, ngModelCtrl) {
        var errorTextElement = angular.element('<span></span>');
        scope.$watch(function() {
          return ngModelCtrl.$error.required && ngModelCtrl.$touched;
        }, function(newVal) {
          if (newVal) {
            var customText = element.attr('error-text')|| 'Valid input!';
            errorTextElement.text(customText);
            element.after(errorTextElement);
          } else {
            errorTextElement.text('');
            errorTextElement.remove();
          }
        });
      }
    };
  })
  
=======
    $routeProvider
        .when('/home', {
            templateUrl: 'app/view/home.html',
            controller: 'homeController'
        })
        .when('/availability', {
            templateUrl: 'app/view/availabilityTemplate.html',
            controller: 'availabilityController'
        })
        .otherwise({ redirectTo: '/home' });
    console.log($routeProvider);
>>>>>>> 7019eafb6022f6981c3b3b611bbba9a524eb75c5

