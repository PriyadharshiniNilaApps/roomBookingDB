app.controller('viewBookingController', ['$scope','listOfItem', function ($scope, listOfItem) {
    $scope.values = listOfItem.get();
    $scope.i = 'app/style/images/view.svg';
    $(document).ready(function(){
        console.log("Basic DataTables Initialization");
        $('#myTable').DataTable({
           
            data:$scope.values,
            columns:[
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
            columnDefs: [
                {
                    targets: [2,3, 4,5,6], // Columns 0 and 1 (first two columns)
                    searchable: false, // Disable searching
                    orderable: false, // Disable ordering
                    className: 'no-toggle' // Add a custom class to prevent toggling
                  }
                ]

        })
    })

    // var user = window.localStorage.getItem("user");
    // if(user != "Owner"){
    //     window.location.href = '#/roomBooking';
    // }

}]);

