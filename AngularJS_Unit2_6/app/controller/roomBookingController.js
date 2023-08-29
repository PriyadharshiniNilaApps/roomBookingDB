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
app.controller('roomBookingController',['$scope', 'EmailService', '$timeout', 'listOfItem', function ($scope, EmailService,$timeout, listOfItem) {
    $scope.form = {
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

    };

   var inputModels = [ "fullname", "gender", "email", "idtype", "age", "purpose", "phonenumber", "idnumber", "roomtype", "checkindate", "expectedcheckoutdate", "cateringType", "laundryType", "roomSize", "checkintime", "expectedcheckouttime"];
   
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
    
      //Showing the additional requirements page after validating room booking form and show loading bar with timeout
      $scope.submitForm = function(){
         if($scope.subForm1.$valid){
              $scope.formSubmitted = true;
        
              $timeout(function () {
                    $scope.roomBookingDetailsForm = false;
                    $scope.formSubmitted = false;
              
              }, 2000);  
          
      }
    }

    const minDate = document.getElementById('checkindate');
    const maxDate = document.getElementById('expectedcheckoutdate');

      //Setting the check in and check out so that check in date is less than check out date    
   
      $scope.setCheckOutDate = function(){
          const minDateValue = minDate.value;
          maxDate.min = minDateValue;
      }

      $scope.setCheckInDate = function(){
          const maxDateValue = maxDate.value;
          minDate.max = maxDateValue;
      }

      // $scope.values = [];
      //Dummy Data
      const jsonData = {
          user: 'Owner',
          userData: {
            fullname: 'priya',
            gender: 'female',
            email: 'priya@gmail.com',
            idType: 'Aadhar Card',
            age: 23,
            purpose: 'wfwfwffer',
            phonenumber: '2343411334' ,
            idnumber: '13222131231',
            roomType: 'Non - AC',
            checkindate: '23-09-2000',
            expectedcheckoutdate: '01-09-2000',
            roomSize: '2',
            checkindate: '12:00',
          },
          customer: [
            {
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
              
            
            }
          
          ]
      }

      //Showing the charges form after validating the additional requirements form 
      $scope.submitAllData = function(){
          if($scope.subForm2.$valid){
            var user = window.localStorage.getItem("user");
            if(user === "Customer"){
              
            }else{
              $.ajax({
                type: 'POST',
                url: 'save_data.php',
                data: { data: jsonData },
                success: function(response) {
                  console.log(response);
                }
              });
          
          
          
          
          
            }
            listOfItem.values($scope.form);


            // console.log(listOfItem.values);
            $scope.roomBookingDetailsForm = true;
            $scope.form = {
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
       
           };
       
             $scope.subForm1.$setUntouched();
             $scope.subForm2.$setUntouched();
            $('#charges').modal("show");      
          }
      }

      $scope.userType = false;

      // var page="#/login";
      // var user = window.localStorage.getItem("user");
      // console.log(user);
      // if(user === "Customer"){
      //   $scope.userType = true;
      // }else{
      //   $scope.userType = false;
      // }
      // if(!user){
      //     window.location.href = page;
      // }
}])

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
