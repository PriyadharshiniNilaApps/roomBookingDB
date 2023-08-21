app.service('EmailService', function(){
    this.validEmail = function(email){
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    this.remaining = function(purpose){
        return 50 - purpose.length + ' characters remaining';    
    }
})

app.controller('roomBookingController',['$scope', 'EmailService', '$timeout', function ($scope, EmailService,$timeout) {
    $scope.form = {
       fullname:'',
    };

    $scope.genders = ['Male','Female','Transgender'];

    $scope.idType = [ 'Aadhar card', 'Voter ID', 'PAN CARD', 'Driving Licence']

    $scope.email = '';
    $scope.emailError = false;
   

    $scope.isValidEmail = function(){
        $scope.emailError = false;
        if($scope.email && !EmailService.validEmail($scope.email)){
            $scope.emailError = true;
        }
    }

    $scope.purpose = '';
    $scope.purposeText = false;

    $scope.remainingCharacters = function(){
           $scope.purposeText = true;
           $scope.validationStatus =  EmailService.remaining($scope.purpose); 
           console.log($scope.validationStatus);
    }

    $scope.clear = function(){
        $scope.purposeText = false;
    }

    $scope.formSubmitted = false;
    $scope.roomBookingDetailsForm = false;
    $scope.chargesForm = true;
  

    $scope.roomSizes = [ '1 bed room', '2 bed room', '3 bed room', '4 bed room' ];

    $scope.defaultSelected = "Choose a Room size"
    
    $scope.cateringTypes = ['Up to 5 persons VEG','Up to 10 persons VEG','Up to 5 persons NON-VEG','Up to 10 persons NON-VEG'];

    $scope.laundryTypes = ['Up to 10 clothes - Normal wash','Up to 20 clothes - Normal wash','Up to 10 clothes - Dry wash','Up to 20 clothes - Dry wash'];  

    $scope.submitForm = function(){
        
        if($scope.subForm1.$valid){
            $scope.formSubmitted = true;
         
            $timeout(function () {
                   $scope.roomBookingDetailsForm = true;
                   $scope.formSubmitted = false;
             
             }, 2000);  
        }

      
        if($scope.subForm2.$valid){
            $scope.formSubmitted = false;
            console.log("valid");
          $('#charges').modal("show");
              
           }
      
    }

    $scope.roomSize = 'roomSize';
    $scope.regex = '/^[a-zA-Z()]+$/'
    $scope.validationStatus = 'Name must be alphabets';
    

}])

// .filter('onlyAlphabets', function() {
//     return function(input,scope){
        
//         if (!(/^[a-zA-Z()]+$/.test(input))) { 
//             scope.validationStatus = 'Name must be alphabets';
//             return true;
//         }
//     };  
// })

.filter('alphaNumerics', function() {
    return function(input,scope){
        
        if (!(/^[\w]+$/.test(input))) { 
            scope.validationStatus = 'You can only use alphabets, numbers and underscore in ID number';
            return true;
        }
    }; 
})

.directive('customDropdown', function () {
    return {
        restrict: 'E',
        scope: {
            formSubmitted: "=",
            selected: '=',
            options: '=',
            selectedOption: '='
        },
      
        template: `
                <select  class="form-control dropdown-icon"   name="{{ value }}" ng-model="selectedOption" required>
                    <option value="" disabled hidden selected>{{ selected }}</option>
                    <option ng-repeat="option in options" value="{{ option }}">{{ option }}</option>
                </select>  
        `,
        link: function(scope, element, attrs){
            scope.value = 'roomSize'; 
        }
    };
})


