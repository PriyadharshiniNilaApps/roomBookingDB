app.controller('loginController', ['$scope', function ($scope) {
   
}]);

//Validating Login Form
function validateLoginForm() {
    const message = document.getElementById('message');
    const username =document.getElementById('username');
    const password = document.getElementById('password');
    const userType = document.querySelector("input[name='options']:checked");
    if (username.value == "" || password.value == "") {
        alert("Enter all data");
    }else{
        message.innerText = `${userType.value} - ${username.value} Sign In Successfully`;
        $('#authentication').modal("show");
    }  
}
 



