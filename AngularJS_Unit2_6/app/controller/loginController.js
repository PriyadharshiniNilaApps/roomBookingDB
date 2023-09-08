app.controller('loginController', ['$scope', '$timeout', function ($scope, $timeout) {
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

       
                $.ajax({
                    url: 'API/get_data.php?', // Replace with the correct URL
                    method: 'GET',
                   
                  success:function(response) {
                 
                    var retrieve =JSON.parse(response);
                    for (var i = 0; i < retrieve.length; i++) {
                        var obj = retrieve[i];
                        if(obj.fullname === username){
                            console.log("Existed");
                        }
                    }
                  }
                });
         
           
            message.innerText = userType.value +  ' - ' + username.value + ' ' + "Sign In Successfully";
            localStorage.setItem("user",userType.value);
            $('#authentication-success').modal("show");
       
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






 

