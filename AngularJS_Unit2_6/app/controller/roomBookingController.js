app.controller('roomBookingController',['$scope', function ($scope, emailService) {
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
    $scope.err = false;
    $scope.isValidEmail = function(){
        $scope.err = emailService.isValidEmail1($scope.email);
    }
}])
.filter('customValidator', function() {
    return function(input,scope){
        
        if (!(/^[a-zA-Z()]+$/.test(input))) { 
            scope.validationStatus = 'Name must be alphabets';
            return true;
        }

         scope.validationStatus = '';
        return false;
    };
   
   
})
.filter('remainingValue', function(){
    return function(input,scope){
        if(!input || input === ''){
            scope.remaining = '';
            return false;
        }else{
        scope.remaining = 50 - input.length + ' characters remaining';
        return true;
        }
        
    }
})
.service('emailService', function(){
    this.isValidEmail1 = function(email){
       
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
})





