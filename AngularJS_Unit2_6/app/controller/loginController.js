app.controller('loginController', ['$scope', '$timeout', function ($scope, $timeout) {
    var page = "#/roomBooking";
 
    //Validating registration form
    $scope.validateLoginForm = function() {
        const message = document.getElementById('message');
        const username =document.getElementById('username');
        const password = document.getElementById('password');
        const userType = document.querySelector("input[name='options']:checked");
       
       $scope.call = function(){
        if(userType.value === "Owner"){
        $.ajax({
            url: "API/get_data.php?",
            method: "POST",
            data: {username:username.value},
    
            success:function(response) {
        console.log(response);
              if(response != ""){
              
               
                localStorage.setItem("user",response);
            
             
              }else{
                alert("Incorrect email or password");
              }
            },
                  
          });
        }else{
            localStorage.setItem("user",userType.value);
        }
        $('#authentication-success').modal("show");
       }
       
        if (username.value == "" || password.value == "") {
            alert("Enter all data");
        } else {
            message.innerText = userType.value +  ' - ' + username.value + ' ' + "Sign In Successfully";
           $scope.call();
           
            
        //     $timeout(function () {
        //         $('#authentication-success').modal("toggle");
        //         // window.location.href = page;
        //   }, 1000);  
        }  
    }

    var user = window.localStorage.getItem("user");
    if(user){
        window.location.href = page;
    }
}])






 

