app.service('EmailService', function(){
    this.validEmail = function(email){
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    this.remaining = function(purpose){
        return 50 - purpose.length + ' characters remaining';    
    }
})

app.controller('roomBookingController',['$scope', 'EmailService', function ($scope, EmailService) {
    $scope.genders = [
        'Male',
        'Female',
        'Transgender',
    ];

    $scope.idType = [
        'Aadhar card',
        'Voter ID',
        'PAN CARD',
        'Driving Licence'
    ]
    
    $scope.cateringTypes = [
        'Up to 5 persons VEG',
        'Up to 10 persons VEG',
        'Up to 5 persons NON-VEG',
        'Up to 10 persons NON-VEG'
    ];

    $scope.laundryTypes = [
        'Up to 10 clothes - Normal wash',
        'Up to 20 clothes - Normal wash',
        'Up to 10 clothes - Dry wash',
        'Up to 20 clothes - Dry wash'

    ];  

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

    $scope.myForm = {};
    $scope.roomBookingDetailsForm = false;
    
    $scope.submitForm = function(){
        if($scope.subForm1.$valid){
            console.log("Valid")
            $scope.roomBookingDetailsForm = true;

        }
    }
}])
.filter('onlyAlphabets', function() {
    return function(input,scope){
        
        if (!(/^[a-zA-Z()]+$/.test(input))) { 
            scope.validationStatus = 'Name must be alphabets';
            return true;
        }

         scope.validationStatus = '';
        return false;
    };
   
   
})


.filter('alphaNumerics', function() {
    return function(input,scope){
        
        if (!(/^[\w]+$/.test(input))) { 
            scope.validationStatus = 'Name must be alphabets';
            return true;
        }

         scope.validationStatus = '';
        return false;
    };
   
   
})





