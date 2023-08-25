app.controller('loginController', ['$scope', function ($scope) {
    var page = "#/roomBooking";

    //Validating registration form
    $scope.validateLoginForm = function() {
        const message = document.getElementById('message');
        const username =document.getElementById('username');
        const password = document.getElementById('password');
        const userType = document.querySelector("input[name='options']:checked");
        if (username.value == "" || password.value == "") {
            alert("Enter all data");
        }else{
            message.innerText = userType.value +  ' - ' + username.value + ' ' + "Sign In Successfully";
            localStorage.setItem("user",username.value);
        //    $('#authentication-success').modal("show");
            window.location.href = page;
        }  
    }

    var user = window.localStorage.getItem("user");
    if(user){
        window.location.href = page;
    }
}])






 

