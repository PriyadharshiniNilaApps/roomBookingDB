app.controller('registerController', ['$scope', function ($scope) {
    $scope.checkPassword = false;
    var page = "#/login"; 

    $scope.register = {    
        userType:"",
        name:"",
        email:"",
        phonenumber:"",
        password:"",
        customers:[]
 
     };
 
   
    //Validating Register form
    $scope.validateRegisterForm = function(){
        const username = document.getElementById("username");
                const password = document.getElementById("password");
                const reenterpassword = document.getElementById("reenterpassword");
                const message = document.getElementById('message');
                const userType = document.querySelector("input[name='options']:checked");
             
            if(password.value != reenterpassword.value){
                // alert("Password doesn't match!");
                $scope.checkPassword = true;
            }else{
            
                $scope.checkPassword = false;
               
               
                if(!$scope.checkPassword){
                    // message.innerText = `${userType.value} - ${username.value} Sign Up Successfully`;
                //  $('#authentication-success').modal("show");
                //   console.log("Etnered");
                     $scope.register.userType = userType.value;
                
                        $.ajax({
                          url: 'API/save_data.php?',
                          method: 'POST',
                          data: {data: JSON.stringify($scope.register)},
                          success: function(response) {
                            console.log(response);
                            alert("User is registered");
                            location.reload();
                          }
                        });
                      }
            }  
        }
    
        //Pop-up Navigation
        $scope.navigate = function(){
            window.location.href=page;
        }
       
          
        
    


    //Validating password
    

    // var user = window.localStorage.getItem("user");
    // if(user){
    //     window.location.href = page;
    // }
}]);

