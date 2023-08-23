app.controller('loginController', ['$scope', function ($scope) {
    var page= "#/roomBooking";
    var user = window.localStorage.getItem("user");
    console.log("Item" + user);
    if(user){
        window.location.href = page;
    }
    $scope.validateLoginForm = function() {
        var page = "#/roomBooking";
        const message = document.getElementById('message');
        const username =document.getElementById('username');
        const password = document.getElementById('password');
        const userType = document.querySelector("input[name='options']:checked");
        if (username.value == "" || password.value == "") {
            alert("Enter all data");
        }else{
            message.innerText = userType.value +  ' - ' + username.value + ' ' + "Sign In Successfully";
            console.log(username.value);
            localStorage.setItem("user",username.value);
           
        //    $('#authentication-success').modal("show");
    
           window.location.href = page;
         
        
         
        }  
    }

    $scope.navigate = function(){
        window.location.href=page;
    }

    
}])
//Validating Login Form






 

