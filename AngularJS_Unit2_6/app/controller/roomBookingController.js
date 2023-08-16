
app.controller('roomBookingController',['$scope', function ($scope) {
    $scope.genders = [
        'Male',
        'Female',
        'Transgender',
    ];
    
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

    $scope.validationStatus = '';
    // $('#charges').modal("show");
  
}]).filter('customValidator', function() {
    return function(input){
        
        if(!input){
            $scope.validationStatus = 'Name is required';
          
            return false;
        }

        if (!(/^[a-zA-Z()]+$/.test(input))) { 
            $scope.validationStatus = 'Name must be alphabets';
            return false;
        }

        $scope.validationStatus = 'Input is valid.';
        return true;
    };
   
   
});






