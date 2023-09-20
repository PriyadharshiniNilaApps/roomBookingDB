app.controller('viewBookingController', ['$scope', function ($scope) {
    //While the page is loaded
    $(document).ready(function(){
        $scope.values = null;
        //Get Request function
     var user = window.localStorage.getItem("userType");
     var usertype = window.localStorage.getItem("user");
        $scope.getData = function(){
        $.ajax({
            url: 'API/get_data.php?', 
            method: 'GET',
            data:{user:usertype, usertype:user},
            success:function(response) {
                console.log(user,usertype);
                 console.log(response);
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
                                return '<img src="' + data + '"  class="view" alt="View Image">'
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

                    $('#myTable').on('click','img.view',function(){
                    console.log("Priya");
                    $('#view-data').modal("show");  
                });
            }   
        });
   }
    $scope.getData();
    console.log($scope.values);
});

   if(user != "Owner"){
       window.location.href = '#/roomBooking';
    }
}])

.component('helloWorld', { 
    template:`<div class="modal text-center" id="view-data" tabindex="-1" role="dialog" aria-labelledby="#view-data aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="d-flex flex-column " id="modal-gap">
                   
    <form>
    <div class="form-group">
        <label class="m-0"> Name </label>
        <span ng-if="!editMode">{{  }}</span>
        <input ng-if="editMode" type="text" class="form-control error-text" ng-pattern="/^[a-zA-Z ]+$/"  id="name" name="fullname" ng-model="form.fullname" placeholder="Enter Full Name" aria-describedby="nameInputField" error-text="Name is required" error-class ng-required="true" >
        <span ng-show="subForm1.fullname.$error.pattern"> {{ alphabetsOnly }}</span>
    </div>
    <div class="form-group">
        <label class="m-0" for="emailId"> Email ID</label>
        <span ng-if="!editMode">{{  }}</span>
        <input ng-if="editMode" type="text" ng-pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/" ng-blur="isValidEmail()" name="email" class="form-control error-text " error-text="E-Mail address is required"  id="emailId" ng-model="form.email" placeholder="Enter E-mail Address" aria-describedby="emailIdInputField"  error-class ng-required="true">
        <span ng-show="subForm1.email.$error.pattern" >Please enter a valid email address.</span>
    </div>
    <div class="form-group">
        <label class="m-0" for="phonenumber"> Phone Number </label>
        <span ng-if="!editMode">{{  }}</span>
        <input ng-if="editMode" type="text" minlength="8" ngMinlength="8"  ngMaxlength="10" maxlength="10" name="phonenumber" error-text="Phone number is required"  oninput="this.value = this.value.replace(/\D+/g, '')" ngPattern="[0-9]{10}" ng-model="form.phonenumber" class="form-control error-text " id="phonenumber"  placeholder="Enter Phone Number"  aria-describedby="phoneNumberInputField"   error-class ng-required="true">
        <span ng-show="subForm1.phonenumber.$error.minlength || subForm1.phonenumber.$error.maxlength">Phonenumber length must be from 8 to 10</span>
    </div>
    <div class="form-group">
        <label class="m-0" for="gender"> Gender </label>
        <span ng-if="!editMode">{{  }}</span>
        <select ng-if="editMode" class="form-control error-text  dropdown-icon"  name="gender" error-text="Gender must be choosen" id="gender" error-class-select ng-model="form.gender" aria-describedby="genderInputField" ng-required="true" >
            <option value disabled selected hidden>Choose Gender</option>
            <option value="{{ i }}" ng-repeat="i in genders"> {{ i }}
        </select>
    </div>
    <div class="form-group">
        <label class="m-0" for="age"> Age </label>
        <span ng-if="!editMode">{{  }}</span>
        <input ng-if="editMode" type="number" class="form-control error-text "  error-text="Age is required" id="age" min="18" max="120" name="age" ng-model="form.age" placeholder="Enter Age" aria-describedby="ageInputField"  error-class ng-required="true">
        <span ng-show="subForm1.age.$error.min || subForm1.age.$error.max">Age must be from 18 to 120 </span>
    </div>
    <div class="form-group">
        <label class="m-0" for="checkindate"> Check-In Date </label>
        <span ng-if="!editMode">{{  }}</span>
        <input ng-if="editMode" class="form-control error-text"  ng-change="setCheckOutDate()" name="checkindate" id="checkindate" error-class error-text="Room check-in date must be choosen" ng-model="form.checkindate" onfocus="{this.type = 'date'}" onblur="this.type= 'text'"  placeholder="Choose Check-In Date" aria-describedby="checkInDateInputField" ng-required="true">
        <span ng-if="err">invalid date!</span>
    </div>
    <div class="form-group">
        <label class="m-0" for="expectedcheckoutdate"> Check-Out Date </label>
        <span ng-if="!editMode">{{  }}</span>
        <input ng-if="editMode" class="form-control" ng-change="setCheckInDate()" id="expectedcheckoutdate"  name="expectedcheckoutdate" ng-model="form.expectedcheckoutdate" onfocus="{this.type = 'date'}" onblur="this.type= 'text'" placeholder="Choose Expected Check-Out date" aria-describedby="expectedCheckOutDateInputField">
        <span ng-if="err">invalid date!</span>
    </div>
    <div class="form-group d-flex flex-column gap-10 ">
        <label class="m-0" for="roomtype">Room type</label>
        <span ng-if="!editMode">{{  }}</span>
        <select ng-if="editMode" class="form-control error-text  dropdown-icon"  name="roomtype" error-text="Room type must be chosen" id="roomtype" error-class-select ng-model="form.roomtype" aria-describedby="roomTypeInputField" ng-required="true" >
            <option value disabled selected hidden> Room Type </option>
            <option value="{{ i }}" ng-repeat="i in roomType"> {{ i }}
        </select>
    </div>
    <div class="form-group">
        <label class="m-0">  Room Size</label>
        <span ng-if="!editMode">{{  }}</span>
        <custom-dropdown  ng-if="editMode" selected="Choose a Room size" name="roomSize" options="roomSizes" ng-model="form.roomSize" ></custom-dropdown>
    </div>
    <div class="form-group">
        <label class="m-0" for="idtype"> ID Type </label>
        <span ng-if="!editMode">{{ }}</span>
        <select ng-if="editMode" class="form-control error-text  dropdown-icon" name="idtype" id="idtype" error-text="Government ID type must be choosen" ng-model="form.idtype" aria-describedby="idTypeInputField" error-class-select ng-required="true" >
            <option value disabled selected hidden>Choose Government ID Type</option>
            <option value="{{ i }}" ng-repeat="i in idType">{{ i }}
        </select>
     </div>
     <div class="form-group">
        <label class="m-0" for="idnumber"> ID Number </label>
        <span ng-if="!editMode">{{ }}</span>
        <input ng-if="editMode" type="text" class="form-control error-text " ng-pattern="/^[\w ]+$/"  id="idnumber"  name="idnumber" ng-model="form.idnumber" error-text="ID number is required" placeholder="Enter Government ID Number" aria-describedby="idNumberInputField" error-class  ng-required="true" >
        <span ng-show="subForm1.idnumber.$error.pattern">You can only use alphabets, numbers and underscore in ID number</span>
   </div>
    <div class="form-group">
        <label class="m-0" for="purpose"> Purpose </label>
        <span ng-if="!editMode">{{ }}</span>
        <input ng-if="editMode" type="text" maxlength="50" ng-change="remainingCharacters()" error-text="Purpose is required" class="form-control error-text " ng-blur="clear()"  id="purpose" name="purpose" ng-model="form.purpose" placeholder="Enter Purpose of Booking" aria-describedby="purposeInputField" error-class  ng-required="true" >
        <span ng-show="purposeText">{{validationStatus}}</span>
    </div>
 
    
  
</form>

                </div>
            </div>
        </div>
    </div>
</div> `,
    controller: function() { 
        this.name = table.column(0).data().toArray();
    }, 
   
}); 