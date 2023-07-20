
<?php
include_once("roombookingmodel.php");
include_once("databaseconnection.php");
$data=json_decode(file_get_contents("php://input"));

class controller extends DBconnection
 { 
public $connection;
public function __construct()
{
$this->connection=$this->Databaseconnection();
}

//insert function 

public function roombookinguserdatainsert($data)
{
$customername= mysqli_real_escape_string($this->connection,$data->Name);   
$gender =mysqli_real_escape_string($this->connection, $data->Gender);  
$customeremail = mysqli_real_escape_string($this->connection,$data->Email); 
$customerage = mysqli_real_escape_string($this->connection,$data->Age); 
$customerphoneno = mysqli_real_escape_string($this->connection,$data->Phoneno);
 $purpose=mysqli_real_escape_string($this->connection,$data->purpose); 
 $idtype= mysqli_real_escape_string($this->connection,$data->idtype); 
 $idno= mysqli_real_escape_string($this->connection,$data->idno); 
 $roomtype = mysqli_real_escape_string($this->connection,$data->roomtype);       
 $roomsize=  mysqli_real_escape_string($this->connection,$data->roomsize);  
 $checkindate=mysqli_real_escape_string($this->connection,$data->checkindate); 
 $checkintime=mysqli_real_escape_string($this->connection,$data->checkintime); 
 $catering=mysqli_real_escape_string($this->connection,$data->catering); 
 $checkoutdate=mysqli_real_escape_string($this->connection,$data->checkoutdate);
 $checkouttime= mysqli_real_escape_string($this->connection,$data->checkouttime);
 $laundry= mysqli_real_escape_string($this->connection,$data->laundry);
$cateringtype= mysqli_real_escape_string($this->connection,$data->cateringtype);
 $laundrytype= mysqli_real_escape_string($this->connection,$data->laundrytype);


 $roombookingmodelobj=new roombookingmodelclass();

  $roombookingform=$roombookingmodelobj->insertform1($customername,$gender,$customeremail ,$customerage, $customerphoneno,$purpose,$idtype, $idno, $roomtype,$roomsize,$checkindate, $checkintime,$catering,$checkoutdate, $checkouttime,$laundry,$cateringtype, $laundrytype);
  
if($roombookingform) 
{  
  echo "Roombooking user data INSERTED succcessfully.";
}  
else
{
  echo 'User data NOT INSERTED.';
}
}

//getdata function

public function roombookinguserdataget()
{
  $roombookingmodelobj=new roombookingmodelclass();
$getdata=$roombookingmodelobj->getuserdata();
 echo $getdata;
}


//update function

public function roombookinguserdataupdate($data)
{
  $Customerid = $data->Customerid;
  // echo   $Customerid ;
 $Name=mysqli_real_escape_string($this->connection, $data->Name);    
 $gender = mysqli_real_escape_string($this->connection, $data->Gender);  
 $customeremail = mysqli_real_escape_string($this->connection, $data->Email); 
$customerage = mysqli_real_escape_string($this->connection, $data->Age); 
$customerphoneno = mysqli_real_escape_string($this->connection, $data->Phoneno); 
$purpose= mysqli_real_escape_string($this->connection, $data->purpose);
$idtype= mysqli_real_escape_string($this->connection, $data->idtype);
$idno= mysqli_real_escape_string($this->connection, $data->idno);
$roomtype= mysqli_real_escape_string($this->connection, $data->roomtype);
$roomsize= mysqli_real_escape_string($this->connection, $data->roomsize);
$checkindate= mysqli_real_escape_string($this->connection, $data->checkindate);
$checkintime= mysqli_real_escape_string($this->connection, $data->checkintime);
$catering= mysqli_real_escape_string($this->connection, $data->catering);
$checkoutdate= mysqli_real_escape_string($this->connection, $data->checkoutdate);
$checkouttime= mysqli_real_escape_string($this->connection, $data->checkouttime);
$laundry= mysqli_real_escape_string($this->connection, $data->laundry);
$cateringtype= mysqli_real_escape_string($this->connection, $data->cateringtype);
$laundrytype= mysqli_real_escape_string($this->connection, $data->laundrytype);
  $roombookingmodelobj=new roombookingmodelclass();
$updatedata=$roombookingmodelobj->updateuserdata($Customerid,$Name,$gender,$customeremail ,$customerage, $customerphoneno,$purpose,$idtype, $idno, $roomtype,$roomsize,$checkindate, $checkintime,$catering,$checkoutdate, $checkouttime,$laundry,$cateringtype, $laundrytype);
 if($updatedata)
 {
  echo "User data UPDATED successfully.";
 }
 else{
  echo "User data NOT UPDATED.";
 }
}

//delete function

public function roombookinguserdatadelete($data)
{
  $roombookingmodelobj=new roombookingmodelclass();
  $deleteuserid= mysqli_real_escape_string($this->connection,$data->deleteuserid);  
  $deletedata=$roombookingmodelobj->deleteuserdata($deleteuserid);

  if($deletedata)
  {
echo "User data DELETED successfully.";
  }
  else{
    echo "User data NOT DELETED.";
  }
}

public function selectuser($data)
{
  $roombookingmodelobj=new roombookingmodelclass();
  $selectid=mysqli_real_escape_string($this->connection,$data->selectid);  
  $selectuser=$roombookingmodelobj->selectuser($selectid);

if($selectuser)
    {
       echo "selectuser column changed(SELECTED).";
    }
    else
    {
       echo "selectuser column Not changed.";
    }
 
}
public function deselecteduser($data)
{
  
  $roombookingmodelobj=new roombookingmodelclass();
  $selectid=mysqli_real_escape_string($this->connection,$data->selectid);  
  $deselecteduser=$roombookingmodelobj->deselecteduser($selectid);

if($deselecteduser)
    {
       echo "selectuser column changed(NOT SELECTED).";
    }
    else
    {
       echo "selectuser column Not changed.";
    }
 
}

public function selectallusers($data)
{
 
  $roombookingmodelobj=new roombookingmodelclass();
  $Customersid=mysqli_real_escape_string($this->connection,$data->Customersid);
  // echo $Cusid."id";
  $selectalluser=$roombookingmodelobj->selectalluser($Customersid);
  if($selectalluser)
  {
     echo "selectuser column changed(SELECTED).";
  }
  else
  {
     echo "selectuser column Not changed.";
  }

}
public function unselectallusers($data)
{
 
  $roombookingmodelobj=new roombookingmodelclass();
  $Customersid=mysqli_real_escape_string($this->connection,$data->Customersid);

  $unselectalluser=$roombookingmodelobj->unselectalluser($Customersid);
  if($unselectalluser)
  {
     echo "selectuser column changed(NOTSELECTED).";
  }
  else
  {
     echo "selectuser column Not changed.";
  }

}
public function resetdata()
{
 
  echo "fromdateapi".$fromdate;
  $roombookingmodelobj=new roombookingmodelclass();

  $resetuser=$roombookingmodelobj->resetdata( );

}
//filtered record
public function filterrecord($data)
{
  $roombookingmodelobj=new roombookingmodelclass();

  $searchfilterdata=mysqli_real_escape_string($this->connection,$data->searchfilterdata); 
  $filtereddata=$roombookingmodelobj->filterrecord($searchfilterdata);
  echo $filtereddata;
}

public function filterrecordbydate($data)
{
  $roombookingmodelobj=new roombookingmodelclass();
  $fromdate=mysqli_real_escape_string($this->connection,$data->fromdate);  
  $todate=mysqli_real_escape_string($this->connection,$data->todate); 
 
  $filtereddata=$roombookingmodelobj->filterrecordbydate($fromdate,$todate);
  echo $filtereddata;
}


public function filterrecordbytodaydate($data)
{
  $roombookingmodelobj=new roombookingmodelclass();
  $todaydate=mysqli_real_escape_string($this->connection,$data->todaydate);  
  $filtereddata=$roombookingmodelobj->filterrecordbytodaydate($todaydate);
  echo $filtereddata;

}

public function sortcolumndesc($data)
{
  $roombookingmodelobj=new roombookingmodelclass();
  $columnname=mysqli_real_escape_string($this->connection,$data->columnname);  
  $sorteddata=$roombookingmodelobj-> sortcolumndesc($columnname);
  echo $sorteddata;
}

public function sortcolumnasc($data)
{
  $roombookingmodelobj=new roombookingmodelclass();
  $columnname=mysqli_real_escape_string($this->connection,$data->columnname);  
  $sorteddata=$roombookingmodelobj-> sortcolumnasc($columnname);
  echo $sorteddata;
}
 }



 $controller=new controller(); 

if(isset($_GET['action'])){
  if($_GET['action'] =="insertdata")
  {

    $controller->roombookinguserdatainsert($data);
   
  }
  
   else if($_GET['action'] =="fetchdata")
    {
     
      $controller->roombookinguserdataget();
     
    }
  else if($_GET['action'] =="update")
  {
    $controller->roombookinguserdataupdate($data);
  }
  else if($_GET['action'] =="delete")
  {
    $controller->roombookinguserdatadelete($data);
  }
  else if($_GET['action'] =="selectuser")
  {
    $controller->selectuser($data);
  }

  else if($_GET['action'] =="deselecteduser")
  {
    $controller->deselecteduser($data);
  }

  else if($_GET['action'] =="selectalluser")
  {
    $controller->selectallusers($data);
  }
  else if($_GET['action'] =="unselectalluser")
  {
    $controller->unselectallusers($data);
  }
  else if($_GET['action'] =="resetselecteddata")
  {
    $controller->resetdata();
  }
  else if($_GET['action'] =="filterrecord")
  {
 
    $controller->filterrecord($data);
  }
  else if($_GET['action'] =="filterrecordbydate")
  {
 
    $controller->filterrecordbydate($data);
  }
 
  else if($_GET['action'] =="filterrecordbytodaydate")
  {
 
    $controller->filterrecordbytodaydate($data);
  }
  else if($_GET['action'] =="descending")
  {
 
    $controller->sortcolumndesc($data);
  }
  else if($_GET['action'] =="ascending")
  {
 
    $controller->sortcolumnasc($data);
  }
}
  
 ?>