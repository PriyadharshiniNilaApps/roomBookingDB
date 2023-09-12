app.controller('viewBookingController', ['$scope', function ($scope) {
    //While the page is loaded
    $(document).ready(function(){
        $scope.values = null;
        //Get Request function
        $scope.getData = function(){
        $.ajax({
            url: 'API/get_data.php?', 
            method: 'GET',
            success:function(response) {
                $scope.values=JSON.parse(response);
                var table = $('#myTable').DataTable({
                    data:$scope.values,
                    columns:[
                        {
                            title: '<input type="checkbox" class="checkbox"  />',
                            render: function (data, type, row) {
                                return '<input type="checkbox" class="checkbox" />';
                            }
                        },
                        { title: '#',
                        data: null,
                        render: (data, type, row, meta) => meta.row +1 },
                        {title:'NAME', data:'fullname' },
                        {title: 'EMAIL', data:'email'},
                        {title: 'ROOM TYPE', data:'roomtype'},
                        {title: 'AGE', data:'age'},
                        {
                            title: 'ROOM SIZE', data: 'roomSize',
                            render: function(data, type, row){
                                return data + ' -  BED';
                            } 
                        },
                        {
                            title: 'VIEW', data: 'view',
                            render:function(data, type, row){
                                return '<img src="' + data + '" alt="View Image">'
                            }
                        }
                    ],
                    paging:true,
                    pagingType: "simple_numbers",
                    dom: '<"top"t><"bottom d-flex"i<"ml-auto"lp>><"clear">',
                    language: {
                        info:"_START_ - _END_ of _TOTAL_",
                        lengthMenu: "Rows per page: _MENU_",
                        paginate: {
                            previous: '‹',
                            next:     '›',
                        },
                        aria: {
                            paginate: {
                                previous: 'Previous',
                                next:     'Next',
                            }
                        },  
                    },
                    drawCallback: function(settings) {         
                        var api = this.api();          
                        var pageInfo = api.page.info();       
                            var paginationDiv = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');                     
                                var customPagination = '<span class="custom-pagination">' + (pageInfo.page + 1) + '/' + pageInfo.pages + '</span>';                  
                                    paginationDiv.find('span').replaceWith(customPagination);   
                    },
                    pageLength:10,
                    lengthMenu:[5,10,25,50,100],
                    columnDefs: [
                        { width:"500px", targets:[2,3,4,5,6,7]},
                        { "className": "dt-center ", "targets": [0,5,6,7] }, 
                        {
                            targets: [0,3,4,5,6,7], 
                            orderable: false,
                            className: 'no-toggle' 
                        },
                        { className: "font-weight-bold", targets: [1,2] }
                   ],
                    "order": [[1, 'asc']],
                    
                    searching: true, 
                    lengthChange: true,
                    
                })
                $('#search').on('keyup', function () {  
                      var customSearchValue = $(this).val();   
                       table.search(customSearchValue).draw();  
                    });
            }   
        });
   }
    $scope.getData();
    console.log($scope.values);
});
// var user = window.localStorage.getItem("user");
//     if(user != "Owner"){
//         window.location.href = '#/roomBooking';
    // }
}]);

