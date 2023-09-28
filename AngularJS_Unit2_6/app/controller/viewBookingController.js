app.controller('viewBookingController', ['$scope', '$timeout', function ($scope, $timeout) {
 
    $(document).ready(function(){

        $scope.values = null;
        //Get Request function
     var user = window.localStorage.getItem("user");
     var usertype = window.localStorage.getItem("userType");
        $scope.getData = function(){
        $.ajax({
            url: 'API/get_data.php?', 
            method: 'GET',
            data:{user:user, usertype:usertype},
            success:function(response) {
                console.log(user,usertype);
                 console.log(response);
                $scope.values=JSON.parse(response);
                var table = $('#myTable').DataTable({
                    data:$scope.values,
                    columns:[
                        {
                            title: '<input type="checkbox" class="checkAll"  />',
                            render: function (data, type, row) {
                                return '<input type="checkbox" class="checkbox" ng-model="" />';
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
                            render:function(data, type, full, meta){
                        
                                return '<img src="' + data + '"  class="view" alt="View Image" data-row = \''+ JSON.stringify(full) +'\' >'
                            }
                        },
                        {
                            title:'',
                            render:function(data,type, full, meta){
                                return '<div class="menu" data-row = \''+ JSON.stringify(full) +'\'> <div class="dot"></div> <div class="dot"></div> <div class="dot"></div>  </div>';
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

                    $('#myTable').on('click','.view',function(){
                        $scope.rowData = JSON.parse($(this).attr('data-row'));
                      
                        $scope.userComponent = $scope.rowData;
                       
                        console.log($scope.userComponent);
                    
                        $timeout(function () {
                            $('#view-data').modal("show"); 
                            }, 1000);  
                          
                          
                       
                    });

                    $('#myTable').on('click','div.menu',function(){
                        $scope.rowData = JSON.parse($(this).attr('data-row'));
                        $scope.userComponent = "";
                        $scope.gender = ['Male','Female','Transgender'];
                        $scope.idtype = [ 'Aadhar card', 'Voter ID', 'PAN CARD', 'Driving Licence'];
                        $scope.roomsizes = [ '1', '2', '3', '4' ];
                        $scope.roomtypes = ['Open','AC', 'NON - AC'];

                        $scope.userComponent = $scope.rowData;
                       
                        console.log($scope.userComponent);
                        $timeout(function () {
                            $('#edit-data').modal("show"); 
                            }, 1000);  
                          
                });

                $('#myTable').on('click','.checkAll',function(){
                    var isChecked = $(this).prop('checked');

                    // Check or uncheck all item checkboxes in the DataTable
                    $('.checkbox').prop('checked', isChecked);
                
                      
            });

            $('#myTable').on('click','.checkbox',function(){

           
                var allCheckboxes = $('.checkbox');
                var selectedCheckboxes = $('.checkbox:checked');
            
                // Check the "Select All" checkbox if all item checkboxes are selected, otherwise uncheck it
                $('.checkAll').prop('checked', allCheckboxes.length === selectedCheckboxes.length);
              });

            }   
        });
   }

    $scope.getData();
    console.log($scope.values);
})


   $scope.submit = function(){

   }
var user = window.localStorage.getItem("user");
var usertype = window.localStorage.getItem("userType");
// $scope.back = false;
//    $scope.backButton = function(){
//     $scope.back = true;
//    }
if(!user){
    window.location.href = '#/login';
}   
    
// if($scope.back){
//     window.location.href = '#/roomBooking';
// }   
     

   if(usertype !== "Owner"){
       window.location.href = '#/roomBooking';
    }

    // $('#datepicker-input').datepicker({
    //     format: 'mm/dd/yyyy', // Date format
    //     autoclose: true, // Close the datepicker when a date is selected
    // });
    window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function (event) {
  window.history.pushState(null, null, window.location.href);
});
}])

.component('viewData', { 
    templateUrl:'app/view/view-component.html',
bindings:{
    values:'<',
   
   },
 
   
})

.component('editData', { 
    templateUrl:'app/view/edit-component.html',
    // controllerAs:'$ctrl',

    
bindings:{
    values:'=',
    options1:'=',
    options2:'=',
    options3:'=',
    options4:'=',
    // submitData:'&',
},
controller: ['$http', function ($http) {
    var ctrl = this;

    ctrl.submitData = function () {
        var user = window.localStorage.getItem("user");
        var usertype = window.localStorage.getItem("userType");
        $.ajax({
            url: 'API/save_data.php',
          method: 'POST',
          data: {  jsonData:JSON.stringify(ctrl.values), user:user, usertype:usertype },
          success: function(response) {
            console.log('Response:', response);
          },
          error:function(error){
                console.log(error);
          }
        });
      
    };
}]


})





