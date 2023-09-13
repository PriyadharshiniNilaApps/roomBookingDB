//Angular Js Service - EmailService
app.service('EmailService', function(){

  //for validating emailformat (priya.gmail.com)
  this.validEmail = function(email){
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  this.remaining = function(purpose){
    return 50 - purpose.length + ' characters remaining';    
  }
})

//injected filters and services
app.controller('roomBookingController',['$scope', 'EmailService', '$timeout', '$rootScope' , function ($scope, EmailService,$timeout, $rootScope) {
    $scope.form = {
       index:++$rootScope.i,
       fullname:"",
       gender:"",
       email:"",
       idtype:"",
       age:"",
       purpose:"",
       phonenumber:"",
       idnumber:"",
       roomtype:"Open",
       checkindate:"",
       expectedcheckoutdate:"",
       cateringType:"",
       laundryType:"",
       roomSize:"",
       checkintime:"",
       expectedcheckouttime:"",
       userType:"",
       view:  "app/style/images/view.svg",
       customer: [],

    };

   var inputModels = [ "fullname", "gender", "email", "idtype", "age", "purpose", "phonenumber", "idnumber", "roomtype", "checkindate", "expectedcheckoutdate", "cateringType", "laundryType", "roomSize", "checkintime", "expectedcheckouttime","view","customer"];
   
    $scope.regex = '/^[a-zA-Z ]+$/'
    $scope.alphabetsOnly = 'Name must be alphabets';
    $scope.genders = ['Male','Female','Transgender'];
    $scope.idType = [ 'Aadhar card', 'Voter ID', 'PAN CARD', 'Driving Licence']
    $scope.email = '';
    $scope.emailError = false;
   
      //validating the email id on focus out from EmailService
      $scope.isValidEmail = function(){
          $scope.emailError = false;
          if($scope.email && !EmailService.validEmail($scope.form.email)){
              $scope.emailError = true;
          }
      }

    $scope.purpose = '';
    $scope.purposeText = false;

      //Getting remaining characters from Emailservice
      $scope.remainingCharacters = function(){
            $scope.purposeText = true;
            $scope.validationStatus =  EmailService.remaining($scope.form.purpose); 
      }

      //Remove the error text in purpose field
      $scope.clear = function(){
          $scope.purposeText = false;
      }
  
    $scope.roomSizes = [ '1', '2', '3', '4' ];
    $scope.cateringTypes = ['Up to 5 persons VEG','Up to 10 persons VEG','Up to 5 persons NON-VEG','Up to 10 persons NON-VEG'];
    $scope.laundryTypes = ['Up to 10 clothes - Normal wash','Up to 20 clothes - Normal wash','Up to 10 clothes - Dry wash','Up to 20 clothes - Dry wash'];  
    $scope.formSubmitted = false;
    $scope.roomBookingDetailsForm = true;
    
    const minDate = document.getElementById('checkindate');
    const maxDate = document.getElementById('expectedcheckoutdate');
   
     $scope.change =  function(){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + '-' + mm + '-' + dd; 
      minDate.min = today;
      maxDate.min =today;
 
     }
           
      //Showing the additional requirements page after validating room booking form and show loading bar with timeout
      $scope.submitForm = function(){
         if($scope.subForm1.$valid){
              $scope.formSubmitted = true;
            
              $timeout(function () {
                    $scope.roomBookingDetailsForm = false;
                    $scope.formSubmitted = false;
              }, 2000);  
              $scope.change();
      }
    }

  


      //Setting the check in and check out so that check in date is less than check out date    
      $scope.setCheckOutDate = function(){
          const minDateValue = minDate.value;
          console.log(minDate.value);
          maxDate.min = minDateValue;
      }

      $scope.setCheckInDate = function(){
          const maxDateValue = maxDate.value;
          minDate.max = maxDateValue;
      }

      // $scope.setDataOwner = function(data,user){
               
      //   $.ajax({
      //     url: 'API/save_data.php?',
      //     method: 'POST',
      //     data: {user:user, data: JSON.stringify(data)},
      //     success: function(response) {
      //       console.log(response);
      //     }
      //   });
      // }

      $scope.addCustomer = function(data,user, usertype){
               
        $.ajax({
          url: 'API/save_data.php?',
        method: 'POST',
      
        data: {  user_1:user,usertype:usertype,data:JSON.stringify(data) },
        success: function(response) {
          console.log(response);
        }
      });
      
    }
    var user = window.localStorage.getItem("user");
    var usertype = window.localStorage.getItem("userType");
    var page="#/login";
   
  
      //Showing the charges form after validating the additional requirements form 
      $scope.submitAllData = function(){
      
      $scope.view =  "app/style/images/view.svg";
    
    
    
      if(user !== "Customer"){
        $scope.addCustomer($scope.form,usertype,user)
      }
      if(!user){
          window.location.href = page;
      }
          
          $scope.roomBookingDetailsForm = true;
            
            $scope.form = {
              index:"",
              fullname:"",
              gender:"",
              email:"",
              idtype:"",
              age:"",
              purpose:"",
              phonenumber:"",
              idnumber:"",
              roomtype:"",
              checkindate:"",
              expectedcheckoutdate:"",
              cateringType:"",
              laundryType:"",
              roomSize:"",
              checkintime:"",
              expectedcheckouttime:"",
              userType:"",
              view:"",
              customer:[],
       
           };

        

          $scope.subForm1.$setUntouched();
             $scope.subForm2.$setUntouched();
            $('#charges').modal("show");
          
          }

         
                
                  
          }
      
 

    
])

//Filter for field with only alphabets
.filter('onlyAlphabets', function() {
  return function(input,scope){
      if (!(/^[a-zA-Z ]+$/.test(input))) { 
        scope.validationStatus = 'Name must be alphabets';
        return true;
      }
  };  
})

//Filter for field with only alphaNumberics
.filter('alphaNumerics', function() {
  return function(input,scope){ 
      if (!(/^[\w ]+$/.test(input))) { 
        scope.validationStatus = 'You can only use alphabets, numbers and underscore in ID number';
        return true;
      }
  }; 
})


//Custom directive for select element 
.directive('customDropdown', function () {
  return {
    restrict: 'E',
    scope: {
        ngModel: '=',
        options: '=',
        selected: '@',
        name: '@',
    },
  
    template: `
      <select  class="form-control dropdown-icon error-text" error-text="Room size must be choosen"  name="name" ng-model="ngModel" required error-class-select>
          <option value="" disabled hidden selected>{{ selected }}</option>
          <option ng-repeat="option in options" value="{{ option }}">{{ option }} bed room</option>
      </select>  
    `
  };
})