app.controller('registerController', ['$scope', function ($scope) {
  
}]);

//Validating Register form
function validateRegisterForm(){
    const userType = document.querySelector("input[name='options']:checked");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const reenterpassword = document.getElementById("reenterpassword");
    const message = document.getElementById('message');

   if(password.value != reenterpassword.value){
        alert("Password doesn't match!");
    }else{
        message.innerText = `${userType.value} - ${username.value} Sign Up Successfully`;
        $('#authentication-success').modal("show");
    }  
}

//Pop-up Navigation
function navigate(){
    window.location.href="#/login";
}

