app.controller('registerController', ['$scope', function ($scope) {
    const userType = document.querySelector("input[name='options']:checked");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const reenterpassword = document.getElementById("reenterpassword");
    const message = document.getElementById('message');
    $scope.checkPassword = false;
    var page = "#/login"; 

    //Validating Register form
    $scope.validateRegisterForm = function(){
        if(!$scope.checkPassword){
            message.innerText = `${userType.value} - ${username.value} Sign Up Successfully`;
            $('#authentication-success').modal("show");
        }
    }

    $scope.register = {
       
        name:"",
        userType:"",
        email:"",
        phonenumber:"",
        password:"",
 
     };
 
    var inputModels = [ "name", "userType", "email", "phonenumber", "password"];
    
    //Validating password
    $scope.validatePassword = function(){
        if(password.value != reenterpassword.value){
            // alert("Password doesn't match!");
            $scope.checkPassword = true;
        }else{
        
            $scope.checkPassword = false;
        }  
    }

    //Pop-up Navigation
    $scope.navigate = function(){
        window.location.href=page;
    }

    // var user = window.localStorage.getItem("user");
    // if(user){
    //     window.location.href = page;
    // }
}]);

