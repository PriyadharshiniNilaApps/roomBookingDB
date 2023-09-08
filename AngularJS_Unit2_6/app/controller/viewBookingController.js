app.controller('viewBookingController', ['$scope', function ($scope) {

    $(document).ready(function(){
        $scope.values = null;
      
        $scope.getData = function(){
        $.ajax({
            url: 'API/get_data.php?', // Replace with the correct URL
            method: 'GET',
           
          success:function(response) {
         
            $scope.values=JSON.parse(response);
 
            var table = $('#myTable').DataTable({
        
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
                    return '<img src="' + data + '" alt="View Image">'
                }}
                    ],
                //   paging: false, // Disable pagination (optional)
                    paging:true,
                    pagingType: "simple_numbers",
                    "dom": '<"top"t><"bottom d-flex"i<"ml-auto"lp>><"clear">',// Display "Previous" and "Next" buttons only
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
                   
                    pageLength:10,
                    lengthMenu:[5,10,25,50,100],
                  
                columnDefs: [
                    { width:"500px", targets:[2,3,4,5,6,7]},
                    { "className": "dt-center", "targets": [0,5,6,7] }, 
                    {
                        targets: [0,3,4,5,6,7], // Columns 0 and 1 (first two columns)
                        orderable: false, // Disable ordering
                        className: 'no-toggle' // Add a custom class to prevent toggling
                      }
                    ],
                    searching: false, 
                    lengthChange: true,
           
                   
            })
           
      
        
        
            table.on('draw.dt', function () {
                var pageInfo = table.page.info();
                var currentPage = pageInfo.page + 1; // Current page number
                var totalPages = pageInfo.pages; // Total number of pages

                var customPagination = '<span class="paginate_button previous" id="myCustomPrevious">Previous</span>';
                customPagination += '<span class="paginate_button next" id="myCustomNext">Next</span>';
                customPagination += '<div class="paginate_info">Page ' + currentPage + ' of ' + totalPages + '</div>';

                $('#customPagination').html(customPagination);

                // Add click event handlers for custom previous and next buttons
                $('#myCustomPrevious').click(function () {
                    if (currentPage > 1) {
                        table.page(currentPage - 2).draw(false);
                    }
                });

                $('#myCustomNext').click(function () {
                    if (currentPage < totalPages) {
                        table.page(currentPage).draw(false);
                    }
                });
            });
    
    
     
          }
          
    });
   
  
}
$scope.getData();
console.log($scope.values);
});
          
 
        // console.log("Basic DataTables Initialization");
        
    // Add class to the footer row for styling (optional)
   

    // Calculate and display totals in the footer row
    // table.column(1, { search: 'applied' }).data().each(function (value) {
    //     // Calculate the sum of the "Age" column
    //     var sum = table.column(1, { search: 'applied' }).data().reduce(function (a, b) {
    //         return a + parseFloat(b);
    //     }, 0);

    //     // Display the sum in the "Age" column of the footer row
    //     table.cell(footerRow, 1).data(sum);

  
    // $("#changeWidthButton").on("click", function() {
    //     $('#myDataTable_wrapper').css("width", "100%");
  
    //   });

    // var user = window.localStorage.getItem("user");
    // if(user != "Owner"){
    //     window.location.href = '#/roomBooking';
    // }

}]);

