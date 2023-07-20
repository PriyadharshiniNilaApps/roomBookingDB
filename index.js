
var app = angular.module("myapp",['angularUtils.directives.dirPagination']);  
app.controller("usercontroller", function($scope,$filter, $http,$timeout){  

  $scope.list2=["Adhar card","Voter ID","PAN CARD","Driving License"]
  $scope.roomsizeoption=["1 bed room","2 bed room","3 bed room","4 bed room"]
 $scope.cateringoption=["UP TO 5 PERSONS VEG","UP TO 10 PERSONS VEG","UP TO 5 PERSONS NON-VEG","UP TO 10 PERSONS NON-VEG"]
 $scope.laundryoption=["UP to 10 clothes - normal wash","UP to 20 clothes - normal wash","UP to 10 clothes - dry wash","UP to 20 clothes - dry wash"]
  $scope.ph_number =/[6-9]\d{9}/;
  $scope.eml_add = /^([a-z\.]+)@([a-z\.]+)\.([a-z]{2,3})$/;
$scope.uname=/^([a-zA-Z_ ]+)$/;
$scope.userage=/^(1[8-9]|[2-9][0-9]|100)$/
$scope.purposeof=/^([a-zA-Z]+)$/;
$scope.IDNUMBER=/^([a-zA-Z0-9]+)$/;
$scope.DateFormat = function (date) 
{
  $scope.formateddate= new Date(date);
  return $scope.formateddate;
};
$scope.fromdatechanged=function()
{
  $scope.todate=null;
  
}
$scope.next = function()
{  

 if($scope.form1.$valid)
 {  $scope.chargemodeldiv=true;
  $scope.form1visible=false;
$scope.form2visible=true;
$scope.roombookingtablevisible=false;

}
else{
  $scope.roombookingform1validation=true;
  $scope.patternvalidation=false;
  $scope.id=2;
  };

  
}  

    $scope.insertData = function()
    {  
      if($scope.catering)
      {
      $scope.cateringneeded="yes";
      $scope.cateringservice=$scope.cateringtype;
      }  
      else{
         $scope.cateringneeded="No";
         $scope.cateringservice="-";
        
      }     
      
      if($scope.laundry)
      {
       $scope.laundryneeded="yes";
       $scope.laundryservice=$scope.laundrytype;
      }
      else{
       $scope.laundryneeded="No";
       $scope.laundryservice="-";
      }     
      if($scope.roombooking.$valid)
      {
$http.post(  
  "roombookingcontroller.php?action=insertdata",  
    {'Name':$scope.username, 'Gender':$scope.dropdownselect1,'Email':$scope.email,'Age':$scope.age,'Phoneno':$scope.phonenumber,'purpose':$scope.purpose,'idtype':$scope.dropdownselect2,'idno':$scope.IDnumber,'roomtype':$scope.roomtype, 'roomsize':$scope.roomsize,'checkindate':$scope.checkindate,'checkintime':$scope.checkintime,'catering':$scope.cateringneeded,'checkoutdate':$scope.checkoutdate,'checkouttime':$scope.Checkouttime,'laundry':$scope.laundryneeded,'cateringtype':$scope.cateringservice,'laundrytype':$scope.laundryservice}
).then(function()
{
  $scope.username = null;
        $scope.dropdownselect1 = null;
        $scope.email = null;
        $scope.age = null;
        $scope.phonenumber = null;
        $scope.purpose = null;
        $scope.dropdownselect2 = null;
        $scope.IDnumber = null;
        $scope.roomtype = null;
        $scope.roomsize = null;
        $scope.checkindate = null;
        $scope.checkintime = null;
        $scope.checkoutdate = null;
        $scope.checkouttime = null;
        $scope.cateringtype = null;
        $scope.laundrytype = null;
        $scope.chargemodeldiv=false;
      $scope.form2visible = false;
      $scope.form1visible =true;
      $scope.roombookingtablevisible =false;
      $scope.catering = false;
      $scope.laundry = false;
})
}
else{
  $scope.roombookingform2validation=true;
  $scope.id1=2;
  };    
     }  

     
      $scope.selecteduseridarray = [];
     $scope.viewbooking = function ()
      {    
        $scope.totalrecordcount=0;
        $scope.chargemodeldiv=false;
      $scope.form2visible = false;
      $scope.form1visible = false;
      $scope.roombookingtablevisible = true;
     
      $http.get(
        "roombookingcontroller.php?action=fetchdata"
                ).then(function(response) 
                { 
                  $scope.users=response.data;
      console.log( $scope.users);
        angular.forEach($scope.users, function (users) 
        {
          $scope.totalrecordcount++;
       users.selecteduser= false;    
       $scope.selecteduseridarray.push(users.Customerid);
      
        })  
         $scope.SelectedCustomerid= $scope.selecteduseridarray.toString(); 
       
          })}




    $scope.selectMember = function (member) 
    {
      if (member.cateringtype!='-') 
      {       
        $scope.a=true;
        $scope.catering=true;
      
      }
      else {
        
        $scope.a=false;
        $scope.catering=false;
       
  
      }
  
      if (member.laundrytype!='-') {
        
        $scope.b=true;
        $scope.laundry=true;
      }
      else {
       
        $scope.b=false;
        $scope.laundry=false;
      }
      
      $scope.member=member;
  $scope.selectedmember=member.Customerid;
      $scope.form2visible = false;
      $scope.form1visible = true;
      $scope.roombookingtablevisible = false;
      $scope.update = true;
      $scope.hidesave = false;
      $scope.username = member.Name;
      $scope.dropdownselect1 = member.Gender;
      $scope.email = member.Email;
      $scope.age = member.Age;
      $scope.phonenumber = member.Phoneno;
      $scope.purpose = member.purpose;
      $scope.dropdownselect2 =member.idtype;
      $scope.IDnumber = member.idno;
      $scope.roomtype = member.roomtype;
      $scope.roomsize = member.roomsize;
      $scope.checkindate =member.checkindate;
      $scope.checkintime =member.checkintime;
      $scope.checkoutdate =member.checkoutdate;
      $scope.checkouttime = member.checkouttime;    
      $scope.cateringtype = member.cateringtype;
      $scope.laundrytype = member.laundrytype;
      $scope.currentcheckintime=false;
    }
 
    $scope.updateMember = function () {    
      if ($scope.cateringtype) 
      {
        $scope.cateringneeded = "yes";
        $scope.cateringservice = $scope.cateringtype;
            
      }

      else {

        $scope.cateringneeded = "No";
        $scope.cateringservice = "-";
  
      }
  
      if ($scope.laundrytype) 
      {

        $scope.laundryneeded = "yes";
        $scope.laundryservice = $scope.laundrytype;
  
      }
      else {
        $scope.laundryneeded = "No";
        $scope.laundryservice = "-";
       
      }
      //if no changes made in cin and cout date 
     if($scope.checkintime== $scope.member.checkintime)
     {
      $scope.Checkintime=$scope.checkintime
     }
     if($scope.checkouttime== $scope.member.checkouttime)
     {
      $scope.Checkouttime=$scope.checkouttime
     }

      if($scope.username != $scope.member.Name ||$scope.dropdownselect1!=$scope.member.Gender || $scope.email!=$scope.member.Email ||$scope.age!=$scope.member.Age||
        $scope.phonenumber!=$scope.member.Phoneno || $scope.purpose!=$scope.member.purpose || $scope.dropdownselect2!=$scope.member.idtype || $scope.IDnumber!=$scope.member.idno ||
        $scope.roomtype !=$scope.member.roomtype || $scope.roomsize!=$scope.member.roomsize ||$scope.checkindate!=$scope.member.checkindate ||$scope.checkintime!= $scope.member.checkintime ||
       $scope.checkoutdate!=$scope.member.checkoutdate || $scope.checkouttime!=$scope.member.checkouttime ||
        $scope.cateringtype!=$scope.member.cateringtype ||$scope.laundrytype!=$scope.member.laundrytype)
      {
      $http.post("roombookingcontroller.php?action=update",
        {
          'Customerid': $scope.selectedmember,
          'Name': $scope.username,
          'Gender': $scope.dropdownselect1,
          'Email': $scope.email,
          'Age': $scope.age,
          'Phoneno': $scope.phonenumber,
          'purpose': $scope.purpose,
          'idtype': $scope.dropdownselect2,
          'idno': $scope.IDnumber,
          'roomtype': $scope.roomtype,
          'roomsize': $scope.roomsize,
          'checkindate': $scope.checkindate,
          'checkintime': $scope.Checkintime,
          'catering': $scope.cateringneeded,
          'checkoutdate': $scope.checkoutdate,
          'checkouttime': $scope.Checkouttime,
          'laundry': $scope.laundryneeded,
          'cateringtype': $scope.cateringservice,
          'laundrytype': $scope.laundryservice
        }
      ).then(function () {
        $scope.username = null;
        $scope.dropdownselect1 = null;
        $scope.email = null;
        $scope.age = null;
        $scope.phonenumber = null;
        $scope.purpose = null;
        $scope.dropdownselect2 = null;
        $scope.IDnumber = null;
        $scope.roomtype = null;
        $scope.roomsize = null;
        $scope.checkindate = null;
        $scope.checkintime = null;
        $scope.checkoutdate = null;
        $scope.checkouttime = null;
        $scope.catering = false;
        $scope.laundry = false;
        $scope.cateringtype = null;
        $scope.laundrytype = null;
        
        var dialog = document.getElementById('updatedialogbox');         
        dialog. show();              
    document.getElementById('hideupdatedialogbox').onclick = function() {    
        dialog.close();  
        $scope.form2visible = false;
        $scope.form1visible =true;
        $scope.roombookingtablevisible =false;   
        $scope.chargemodeldiv=false;
    };  
      })
    }
    else{

$scope.username = null;
        $scope.dropdownselect1 = null;
        $scope.email = null;
        $scope.age = null;
        $scope.phonenumber = null;
        $scope.purpose = null;
        $scope.dropdownselect2 = null;
        $scope.IDnumber = null;
        $scope.roomtype = null;
        $scope.roomsize = null;
        $scope.checkindate = null;
        $scope.checkintime = null;
        $scope.checkoutdate = null;
        $scope.checkouttime = null;
        $scope.catering = null;
        $scope.laundry = null;
        $scope.cateringtype = null;
        $scope.laundrytype = null;

      var dialog = document.getElementById('notupdatedialogbox');         
      dialog. show();              
  document.getElementById('hidenotupdatedialogbox').onclick = function() {    
      dialog.close();   
      $scope.form2visible = false;
      $scope.form1visible =true;
      $scope.roombookingtablevisible =false;  
      $scope.chargemodeldiv=false;
  };      
    }
  }

    $scope.deleteuserdata=function(user)
    {
      $scope.deleteuserid=user.Customerid
    }

    $scope.deletedata = function () 
    {
     
      $http.post("roombookingcontroller.php?action=delete", {
        'deleteuserid':$scope.deleteuserid
      })
     
      $scope.viewbooking();
    };
  

    $scope.createbooking = function () 
    {
      $scope.chargemodeldiv=false;
      $scope.form1visible = true;
      $scope.form2visible = false;
      $scope.roombookingtablevisible = false;
  $scope.hidesave=true;
  $scope.update=false;
      $scope.Customerid = null;
      $scope.username = null;
      $scope.dropdownselect1 = null;
      $scope.email = null;
      $scope.age = null;
      $scope.phonenumber = null;
      $scope.purpose = null;
      $scope.dropdownselect2 = null;
      $scope.IDnumber = null;
      $scope.roomtype = null;
      $scope.roomsize = null;
      $scope.checkindate = null;
      $scope.checkintime = null;
      $scope.checkoutdate = null;
      $scope.checkouttime = null;
      $scope.catering = null;
      $scope.laundry = null;
      $scope.cateringtype = null;
      $scope.laundrytype = null;
  
    };
  
    $scope.selectuser = function (id) 
    {
      $scope.count=0;
  
      angular.forEach($scope.users, function (users) {
    //  console.log(users.selecteduser)
        if(users.selecteduser==false && users.Customerid==id)
        {
           $scope.count=1;
        }
      
    })
    //for export button disable
    $scope.totalrecordsavailable=0;
    $scope.uncheckedrecords=0;

    if($scope.count==1)
    { 
      $http.post("roombookingcontroller.php?action=deselecteduser",
      {
        'selectid': id
      })

      angular.forEach($scope.users, function (users) 
      {
  
           $scope.totalrecordsavailable++;
     
    
    })
    angular.forEach($scope.users, function (users) 
    {
  
      if(users.selecteduser==false)
      {
         $scope.uncheckedrecords++;
      }
      


})
if($scope.totalrecordsavailable==$scope.uncheckedrecords)
{
  $scope.exportbutton=true;
}

else{
  $scope.exportbutton=false;
}
    
      
    }

    else if($scope.count==0)
    {
        $scope.exportbutton=false;
        $http.post("roombookingcontroller.php?action=selectuser",
        {
          'selectid': id
        })
      
    }
      
    }

    $scope.count1=0;

    $scope.selectall = function () {
      $scope.checkallalldata=true;
      
      if($scope.count1==1)
      {
        $scope.exportbutton=true;
        angular.forEach($scope.users, function (users) {
          users.selecteduser= false;   
       $scope.count1=0;
    
      })
      $http.post("roombookingcontroller.php?action=unselectalluser",{'Customersid':$scope.SelectedCustomerid}
      )
      }

      else
      {
        $scope.exportbutton=false;
      $scope.count1++;
      angular.forEach($scope.users, function (users) {
        users.selecteduser= true;
    })
    $http.post("roombookingcontroller.php?action=selectalluser",{'Customersid':$scope.SelectedCustomerid}
    )}
  
  }


  
   // filterrecord 

   $scope.filterrecord=function()
   {
  if($scope.search!=null)
  {
    $scope.users=[];
    $scope.totalrecordcount=0;
     $http.post(
       "roombookingcontroller.php?action=filterrecord",{'searchfilterdata':$scope.search}
     ).then(function(response) 
      {
        $scope.selecteduseridarray = [];
       
        $scope.filteredrecord = response.data;  
        $scope.continue = true;
        angular.forEach( $scope.filteredrecord, function (filteredrecord) {
          if($scope.continue) 
          {
         if(filteredrecord.Name==$scope.search)
         {
          $scope.users.push(filteredrecord);
         $scope.continue = false;
         $scope.totalrecordcount++;
         }
         else{
          console.log("else")
          $scope.users.push(filteredrecord);
          $scope.totalrecordcount++;
         }
      
        }
         
      })   

        if($scope.users=='')
    {
     
     
      var dialog = document.getElementById('recordnotfounddialogbox');         
      dialog. showModal();       
      document.body.style.opacity = "0.5";   
  document.getElementById('hiderecordnotfounddialogbox').onclick = function() {    
      dialog.close();    
      document.body.style.opacity = "1";   
  };      
 
     
      $scope.search=null;
      $scope.viewbooking();
    }
    else if($scope.users){
    
        angular.forEach($scope.users, function (users) {
          $scope.selecteduseridarray.push(users.Customerid);
        // console.log($scope.selecteduseridarray);
      })
      $scope.SelectedCustomerid= $scope.selecteduseridarray.toString();
      $scope.search=null;
    }
     })
   }
   else{

      var dialog = document.getElementById('Filterdialogbox');       
          dialog. showModal(); 
          document.body.style.opacity = "0.5";         
      document.getElementById('hidedialogbox').onclick = function() {      
          dialog.close();    
          document.body.style.opacity = "1";
           
      };    

   }
  }
 
$scope.filterrecordbydate=function()
{

  $scope.totalrecordcount=0;
  $http.post(
    "roombookingcontroller.php?action=filterrecordbydate",{'fromdate':$scope.fromdate,'todate':$scope.todate}
  ).then(function(response) 
   {
    $scope.selecteduseridarray = [];
    $scope.users = response.data;
    angular.forEach($scope.users, function (users) {
      $scope.totalrecordcount++;
  }) 

    if($scope.users=='')
    {
     
      var dialog = document.getElementById('recordnotfounddialogbox'); 
      document.body.style.opacity = "0.5";           
      dialog. showModal();       
  document.getElementById('hiderecordnotfounddialogbox').onclick = function() {    
      dialog.close();    
      document.body.style.opacity = "1";   
  };   

      $scope.fromdate='';
      $scope.todate='';
      $scope.viewbooking();
    }

    else if($scope.users){
    
    angular.forEach($scope.users, function (users) {
      $scope.selecteduseridarray.push(users.Customerid);
    
  })
  $scope.SelectedCustomerid= $scope.selecteduseridarray.toString();
  $scope.fromdate='';
      $scope.todate='';
    }
  })

}
$scope.currentdaterecord=function()
{
 
  $scope.totalrecordcount=0;
  $scope.TODAYDATE = new Date();
  
  $http.post(
    "roombookingcontroller.php?action=filterrecordbytodaydate",{'todaydate':$scope.TODAYDATE}
  ).then(function(response) 
{

  $scope.selecteduseridarray = [];
  $scope.users = response.data;
  angular.forEach($scope.users, function (users) {
    $scope.totalrecordcount++;
}) 
  if($scope.users=='')
  {
    var dialog = document.getElementById('recordnotfounddialogbox');      
    document.body.style.opacity = "0.5";      
    dialog.showModal();       
document.getElementById('hiderecordnotfounddialogbox').onclick = function() {    
    dialog.close();    
    document.body.style.opacity = "1";   
};   
    $scope.todaydate=null;
    $scope.viewbooking();
   
  }
  else if($scope.users)
  {
  angular.forEach($scope.users, function (users) {
    $scope.selecteduseridarray.push(users.Customerid);
  console.log($scope.selecteduseridarray);
})
$scope.SelectedCustomerid= $scope.selecteduseridarray.toString();
}
}
  )

   //for currentdate button to show
   $scope.FILTERDATE ='CURRENT';
}
  
    $scope.exportdata = function () {
      $scope.exportbutton=true;
      $scope.checkallalldata=false;
      $scope.count1=0;
      $scope.totalrecordsavailable=0;
      $scope.uncheckedrecords=0;
      angular.forEach($scope.users, function (users) {
        users.selecteduser= false;
    
    })
    
      const link = document.createElement('a');
      link.setAttribute('href', 'exportdata.php');
       link.click();

       $timeout(function () {
      $scope.changingdbselectuser();
  
      }, 1000);
      
  
    }
  
  
    $scope.changingdbselectuser = function () 
    {
      $http.post("roombookingcontroller.php?action=resetselecteddata")
    }
  



  
  
    $scope.roombookingcharges = function () {
      if ($scope.roomtype == "AC") {
  
        for (i = 0; i < 1; i++) {
          if ($scope.roomtype == "AC" && $scope.roomsize == "1 bed room") {
  
            var roomprice = 800;
            $scope.roomcharges = roomprice;
            break;
          }
          else if ($scope.roomtype == "AC" && $scope.roomsize == "2 bed room") {
            var roomprice = 1300;
            $scope.roomcharges = roomprice;
            break;
          }
          else if ($scope.roomtype == "AC" && $scope.roomsize == "3 bed room") {
            var roomprice = 1800;
            $scope.roomcharges = roomprice;
            break;
          }
          else if ($scope.roomtype == "AC" && $scope.roomsize == "4 bed room") {
            var roomprice = 2300;
            $scope.roomcharges = roomprice;
            break;
          }
          else {
            var roomprice = 0;
            $scope.roomcharges = roomprice;
          }
        }
  
      }
  
      else {
        for (i = 0; i < 1; i++) {
          if ($scope.roomtype == "NON-AC" && $scope.roomsize == "1 bed room") {
  
            var roomprice = 500;
            $scope.roomcharges = roomprice;
            break;
          }
          else if ($scope.roomtype == "NON-AC" && $scope.roomsize == "2 bed room") {
            var roomprice = 1000;
            $scope.roomcharges = roomprice;
            break;
          }
          else if ($scope.roomtype == "NON-AC" && $scope.roomsize == "3 bed room") {
            var roomprice = 1500;
            $scope.roomcharges = roomprice;
            break;
          }
          else if ($scope.roomtype == "NON-AC" && $scope.roomsize == "4 bed room") {
            var roomprice = 2000;
            $scope.roomcharges = roomprice;
            break;
          }
          else {
            var roomprice = 0;
            $scope.roomcharges = roomprice;
          }
        }
      }
      for (i = 0; i < 4; i++) {
        if ($scope.cateringtype == "UP TO 5 PERSONS VEG") {
  
          var cateringprice = 300;
          $scope.cateringcharges = cateringprice;
          break;
        }
        else if ($scope.cateringtype == "UP TO 10 PERSONS VEG") {
          var cateringprice = 500;
          $scope.cateringcharges = cateringprice;
          break;
        }
        else if ($scope.cateringtype == "UP TO 5 PERSONS NON-VEG") {
          var cateringprice = 500;
          $scope.cateringcharges = cateringprice;
          break;
        }
        else if ($scope.cateringtype == "UP TO 10 PERSONS NON-VEG") {
          var cateringprice = 800;
          $scope.cateringcharges = cateringprice;
          break;
        }
        else {
          var cateringprice = 0;
          $scope.cateringcharges = cateringprice;
  
        }
      }
      for (i = 0; i < 4; i++) {
        if ($scope.laundrytype == "UP to 10 clothes - normal wash") {
          var laundryprice = 300;
          $scope.laundrycharges = laundryprice;
          break;
        }
        else if ($scope.laundrytype == "UP to 20 clothes - normal wash") {
          var laundryprice = 500;
          $scope.laundrycharges = laundryprice;
          break;
        }
        else if ($scope.laundrytype == "UP to 10 clothes - dry wash") {
          var laundryprice = 500;
          $scope.laundrycharges = laundryprice;
          break;
        }
        else if ($scope.laundrytype == "UP to 20 clothes - dry wash") {
          var laundryprice = 800;
          $scope.laundrycharges = laundryprice;
          break;
        }
        else {
          var laundryprice = 0;
          $scope.laundrycharges = laundryprice;
        }
      }
      var sumof = laundryprice + cateringprice + roomprice;
      var tax = sumof * 18 / 100;
      $scope.taxamount = tax;
      var totalamount = sumof + tax;
  
      $scope.totalcost = totalamount;
      $scope.charges = function () {
        alert("TOTAL ROOMBOOKING CHARGES IN RS: " + $scope.totalcost);
      }
    }
    $scope.backtoform1page = function () {
      $scope.form2visible = false;
      $scope.form1visible = true;
      $scope.roombookingtablevisible = false;
    }
  
    // additional text
    $scope.usernametext = function () {
      $scope.roombookingform1validation=false;
      $scope.id=3;
      $scope.patternvalidation=true;
      $scope.showusernamediv = true;
      $scope.showuseragediv = false;
      $scope.showusergenderdiv = false;
      $scope.showuserpurposediv = false;
      $scope.showuseridnodiv = false;
      $scope.showuseridtypediv = false;
      $scope.showuserphonenodiv = false;
      $scope.showuseremaildiv = false;
  
  
      $scope.hideusernametext = false;
     
      $scope.nametext = "Name should contain only alphabets";
      $timeout(function () {
        $scope.hideusernametext = true;
  
      }, 2000);
  
    }
  
    $scope.useragetext = function () {
      $scope.roombookingform1validation=false;
      $scope.id=3;
      $scope.patternvalidation=true;
      $scope.showusernamediv = false;
      $scope.showuseragediv = true;
      $scope.showusergenderdiv = false;
      $scope.showuserpurposediv = false;
      $scope.showuseridnodiv = false;
      $scope.showuseridtypediv = false;
      $scope.showuserphonenodiv = false;
      $scope.showuseremaildiv = false;
  
      $scope.hideuseragetext = false;
     
      $scope.agetext = "Age range between 18-100";
      $timeout(function () {
        $scope.hideuseragetext = true;
  
      }, 2000);
  
    }
    $scope.usergendertext = function () {
      $scope.roombookingform1validation=false;
      $scope.id=3;
      $scope.showusernamediv = false;
      $scope.showuseragediv = false;
      $scope.showusergenderdiv = true;
      $scope.showuserpurposediv = false;
      $scope.showuseridnodiv = false;
      $scope.showuseridtypediv = false;
      $scope.showuserphonenodiv = false;
      $scope.showuseremaildiv = false;
  
      $scope.hideusergendertext = false;
  
      $scope.gendertext = "Select your gender carefully ";
      $timeout(function () {
        $scope.hideusergendertext = true;
  
      }, 2000);
  
    }
  
    $scope.userpurposetext = function () {
  
      $scope.roombookingform1validation=false;
      $scope.id=3;
      $scope.patternvalidation=true;
      $scope.showusernamediv = false;
      $scope.showuseragediv = false;
      $scope.showusergenderdiv = false;
      $scope.showuserpurposediv = true;
      $scope.showuseridnodiv = false;
      $scope.showuseridtypediv = false;
      $scope.showuserphonenodiv = false;
      $scope.showuseremaildiv = false;
  
      $scope.hideuserpurposetext = false;
    
      $scope.purposetext = "Purpose should contain only alphapets ";
      $timeout(function () {
        $scope.hideuserpurposetext = true;
  
      }, 2000);
  
  
    }
    $scope.useremailtext = function () {
  
      $scope.roombookingform1validation=false;
      $scope.id=3;
      $scope.patternvalidation=true;
      $scope.showusernamediv = false;
      $scope.showuseragediv = false;
      $scope.showusergenderdiv = false;
      $scope.showuserpurposediv = false;
      $scope.showuseridnodiv = false;
      $scope.showuseridtypediv = false;
      $scope.showuserphonenodiv = false;
      $scope.showuseremaildiv = true;
  
      $scope.hideuserpurposetext = false;
     
      $scope.emailtext = "Email should be in format eg: a-z@a-z.a-z";
      $timeout(function () {
        $scope.hideuseremailtext = true;
  
      }, 2000);
  
  
    }
    $scope.userphonenotext = function () {
  
  
      $scope.roombookingform1validation=false;
      $scope.id=3;
      $scope.patternvalidation=true;
  
      $scope.showusernamediv = false;
      $scope.showuseragediv = false;
      $scope.showusergenderdiv = false;
      $scope.showuserpurposediv = false;
      $scope.showuseridnodiv = false;
      $scope.showuseridtypediv = false;
      $scope.showuserphonenodiv = true;
      $scope.showuseremaildiv = false;
  
      $scope.hideusernametext = false;
      
      $scope.phonenotext = "Mobile number should contain 10digit numbers";
      $timeout(function () {
        $scope.hideuserphonenotext = true;
  
      }, 2000);
  
    }
    $scope.useridtypetext = function () {
      $scope.roombookingform1validation=false;
      $scope.id=3;
     
  
      $scope.showusernamediv = false;
      $scope.showuseragediv = false;
      $scope.showusergenderdiv = false;
      $scope.showuserpurposediv = false;
      $scope.showuseridnodiv = false;
      $scope.showuseridtypediv = true;
      $scope.showuserphonenodiv = false;
      $scope.showuseremaildiv = false;
  
      $scope.hideuseridtypetext = false;
     
      $scope.idtypetext = "Select ID proof for verification";
      $timeout(function () {
        $scope.hideuseridtypetext = true;
  
      }, 2000);
  
    }
    $scope.useridnotext = function () {
  
  
      $scope.roombookingform1validation=false;
      $scope.id=3;
      $scope.showusernamediv = false;
      $scope.showuseragediv = false;
      $scope.showusergenderdiv = false;
      $scope.showuserpurposediv = false;
      $scope.showuseridnodiv = true;
      $scope.showuseridtypediv = false;
      $scope.showuserphonenodiv = false;
      $scope.showuseremaildiv = false;
      $scope.hideuseridnotext = false;
      
      $scope.idnotext = "Enter the selected id type number";
      $timeout(function () {
        $scope.hideuseridnotext = true;
  
      }, 2000);
  
    }
  //sorting

$scope.sortcount=0;
    $scope.sortColumn = function (col) {
      $scope.column = col;     
      if ($scope.sortcount==0) 
      {
        $http.post("roombookingcontroller.php?action=descending",
        {
          'columnname':$scope.column
          
        }
        
        ).then(function(response) 
        {
         $scope.users=response.data;
        })
        $scope.sortcount++; 
      }
      else if($scope.sortcount==1)
      {
        $http.post("roombookingcontroller.php?action=ascending",
        {
          'columnname':$scope.column
        }
        
        ).then(function(response) 
        {
         $scope.users=response.data;
        })
        $scope.sortcount=0;
      }
    };
  
    //adding arrow to table head
    $scope.sortClass = function (col) {
      if ($scope.column == col) {
        if ( $scope.sortcount==1) {

          return 'arrow-down';
        } 
        else {
          return 'arrow-up';
        }
      }
    }
  
   
   
    $scope.Timeformatcheckintime = function()  
    {
      $scope.time=$scope.checkintime.toString();
      $scope.timeSplit=$scope.time.split(':');
      $scope.hour =$scope.timeSplit[0];
      $scope.minute=$scope.timeSplit[1];
      switch($scope.hour)
      {
      case '12':
        $scope.changedhour=12;
        break;
        case '24':
          $scope.changedhour=12;
          break;
          case '00':
            $scope.changedhour=12;
          break;
          default:
            $scope.changedhour=$scope.hour%12;
       }
    $scope.ampm=$scope.hour>=12 &&$scope.hour<24?'PM':'AM';
    $scope.Checkintime=$scope.changedhour+":"+$scope.minute+$scope.ampm;
    console.log($scope.Checkintime+"time");
    }

    
    $scope.Timeformatcheckouttime = function()  {
      $scope.time=$scope.checkouttime.toString();
    $scope.timeSplit=$scope.time.split(':')
     $scope.hour =$scope.timeSplit[0];
     $scope.minute=$scope.timeSplit[1];
    switch($scope.hour)
    {
      case '12':
        $scope.changedhour=12;
        break;
        case '24':
          $scope.changedhour=12;
          break;
          case '00':
            $scope.changedhour=12;
          break;
          default:
            $scope.changedhour=$scope.hour%12;
    }
    $scope.ampm=$scope.hour>=12 &&$scope.hour<24?'PM':'AM';
    $scope.Checkouttime=$scope.changedhour+":"+$scope.minute+$scope.ampm;
    console.log($scope.Checkouttime+"time");
    }
    
   
    $scope.todaterange=function()
    {
      
      const todate= new Date($scope.fromdate);
      
      todate.setDate(todate.getDate()+1);
      $scope.range=$filter('date')(todate, 'yyyy-MM-dd');

      var todateminimumrange= document.getElementById('daterange');
      todateminimumrange.setAttribute('min',$scope.range);
  
    }
   
     
    $scope.checkindatefunction=function()
    {
      

  console.log("hsdj");
  const dates = new Date();
  $scope.time=dates.toString();
  $scope.currenttimesplit=$scope.time.split(':')
 $scope.ch=$scope.currenttimesplit[0];
$scope.currenthoursplit=$scope.ch.split(' ');
$scope.currenthour=$scope.currenthoursplit[4];
//  console.log($scope.currenthour+"hour");
 $scope.currentminute=$scope.currenttimesplit[1];
//  console.log($scope.currentminute+"minute");
switch($scope.currenthour)
{
  case '12':
    $scope.changedcurrenthour=12;
    break;
    case '24':
      $scope.changedcurrenthour=12;
      break;
      case '00':
        $scope.changedcurrenthour=12;
      break;
      default:
        $scope.changedcurrenthour=$scope.currenthour%12;
}
$scope.currentampm=$scope.currenthour>=12 &&$scope.currenthour<24?'PM':'AM';
$scope.checkintime=$scope.changedcurrenthour+":"+$scope.currentminute+$scope.currentampm;

// console.log($scope.checkintime+"time");
$scope.currentcheckintime=true;


      const checkindate= new Date();
      $scope.range=$filter('date')(checkindate,'yyyy-MM-dd');

      var checkinminimumrange= document.getElementById('checkindaterange');
      checkinminimumrange.setAttribute('min',$scope.range);
      
    }
     
    $scope.checkoutdatefunction=function()
    {
      
      const checkoutdate= new Date();
      $scope.range=$filter('date')(checkoutdate,'yyyy-MM-dd');
      var checkoutminimumrange= document.getElementById('checkoutdaterange');
      checkoutminimumrange.setAttribute('min',$scope.range);
  
    }

    })