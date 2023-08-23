app.controller('registerController', ['$scope', function ($scope) {
    //Validating Register form
$scope.validateRegisterForm = function(){
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



    var page = "#/login"; 
    //Pop-up Navigation
    $scope.navigate = function(){
        window.location.href=page;
    }


    var user = window.localStorage.getItem("user");
    if(user){
        window.location.href = page;
    }
}]);

