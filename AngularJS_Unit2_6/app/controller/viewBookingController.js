app.controller('viewBookingController', ['$scope','listOfItem', function ($scope, listOfItem) {
    $scope.values = listOfItem.get();
    $scope.i = 'app/style/images/view.svg';
    $scope.getData = function() {
     
      
        $.ajax({
          url: 'API/get_data.php?', // Replace with the correct URL
          method: 'GET',
         
        success:function(response) {
          var retrieved= response;
          $scope.values = retrieved;
        }
        });
    }
  
    
    $(document).ready(function(){
        $scope.getData();
        console.log("Basic DataTables Initialization");
        $('#myTable').DataTable({
           
            data:$scope.values,
            columns:[
                {
                    title: '<input type="checkbox" class="checkbox" />',
                    render: function (data, type, row) {
                        return '<input type="checkbox" class="checkbox" />';
                    },
                },
                {title: '#', data:'index'},
                {title:'NAME', data:'fullname' },
                {title: 'EMAIL', data:'email'},
                {title: 'ROOM TYPE', data:'roomtype'},
                {title: 'AGE', data:'age'},
                {title: 'ROOM SIZE', data: 'roomSize',
                render: function(data, type, row){
                    return data + ' -  BED';
                } },
                {title: 'VIEW', data: 'view',
            render:function(data, type, row){
                console.log('Image URL:',data);
                return '<img src="' + data + '" alt="View Image">'
            }}
                ],
                paging:true,
                pageLength:10,
                language:{
                        info:"_START_ - _END_ of _TOTAL_ "
                },
            columnDefs: [
                {
                    targets: [0,3,4,5,6,7], // Columns 0 and 1 (first two columns)
                    searchable: false, // Disable searching
                    orderable: false, // Disable ordering
                    className: 'no-toggle' // Add a custom class to prevent toggling
                  }
                ],
                searching: false,
                lengthChange: false,

          
        })
    })

    // var user = window.localStorage.getItem("user");
    // if(user != "Owner"){
    //     window.location.href = '#/roomBooking';
    // }

}]);

