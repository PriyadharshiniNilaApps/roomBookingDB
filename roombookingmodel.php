<?php
include_once 'databaseconnection.php';
class roombookingmodelclass extends DBconnection
{
    public $conn;
    function __construct()
    {
        $dbconnection = new DBconnection();
        $this->conn = $dbconnection->Databaseconnection();
       
    }
// insert function
public function insertform1($customername,$gender,$customeremail,$customerage,$customerphoneno,$purpose,$idtype,$idno ,$roomtype,  $roomsize,$checkindate,$checkintime, $catering,  $checkoutdate,   $checkouttime,$laundry,$cateringtype, $laundrytype)
{

mysqli_query($this->conn,"INSERT INTO Customerdetails(Name,Gender,Email,Age,Phoneno) VALUES ('$customername', '$gender ','$customeremail ','$customerage ','$customerphoneno')");
$lastid = mysqli_insert_id($this->conn); 
$result=mysqli_query($this->conn,"INSERT INTO Bookingdetails(purpose,idtype,idno,roomtype,roomsize,checkindate,checkintime,catering,checkoutdate,checkouttime,laundry,cateringtype,laundrytype,Customerid) VALUES ('$purpose','$idtype','$idno','$roomtype', '$roomsize','$checkindate','$checkintime','$catering','$checkoutdate','$checkouttime','$laundry','$cateringtype','$laundrytype','$lastid')");
return $result;
}

public function getuserdata()
{
    $result = mysqli_query($this->conn,"SELECT * FROM `Customerdetails` bd INNER JOIN `Bookingdetails` cd ON bd.Customerid =cd.Customerid
    where bd.Deleteuser='AVAILABLE'");
    $data = array();
    
    while ($row = mysqli_fetch_array( $result)) {
   
    $data[]=$row;
    }
    
  
    return  json_encode($data);
}
public function updateuserdata($Customerid,$Name,$gender,$customeremail ,$customerage, $customerphoneno,$purpose,$idtype, $idno, $roomtype,$roomsize,$checkindate, $checkintime,$catering,$checkoutdate, $checkouttime,$laundry,$cateringtype, $laundrytype)
{
    $query =" update 
    Bookingdetails B,Customerdetails C 
    SET  C.Name='$Name' ,c.Gender='$gender',c.Email='$customeremail',c.Age='$customerage',
    c.Phoneno='$customerphoneno',B.purpose='$purpose',B.idtype='$idtype',B.idno=' $idno',B.roomtype='$roomtype',
    B.roomsize='$roomsize',B.checkindate='$checkindate',B.checkintime='$checkintime',B.catering='$catering',
    B.checkoutdate='$checkoutdate',B.checkouttime='$checkouttime',B.laundry='$laundry',B.cateringtype='$cateringtype',B.laundrytype='$laundrytype'

    where B.Customerid='$Customerid' AND C.Customerid='$Customerid'";
 
       $result=mysqli_query($this->conn, $query);
 
     return $result;
}


public function deleteuserdata($deleteuserid)
{
   
    $query= "update  Customerdetails SET Deleteuser='DELETED'
    where Customerid='$deleteuserid'";
    $result=mysqli_query($this->conn,$query);
    return  $result;
}

public function selectuser($selectid)
{
   
    $query= "update  Customerdetails SET selectuser='SELECTED'
    where Customerid='$selectid'";
    $result=mysqli_query($this->conn,  $query);
    return $result;

}
public function deselecteduser($selectid)
{
   
    $query= "update  Customerdetails SET selectuser='NOTSELECTED'
    where Customerid='$selectid'";
    $result=mysqli_query($this->conn,$query);
    // echo json_encode($result);
    return $result;

}


public function selectalluser($Customersid)
{
    $query="UPDATE  Customerdetails SET selectuser='SELECTED'
    where Customerid IN($Customersid)";
    
    $result=mysqli_query($this->conn,  $query);
       return $result;
}
public function unselectalluser($Customersid)
{
    $query="UPDATE  Customerdetails SET selectuser='NOTSELECTED'
    where Customerid IN($Customersid)";
    
    $result=mysqli_query($this->conn,  $query);
       return $result;
}
public function resetdata()
{
    $query= "update  Customerdetails SET selectuser='NOTSELECTED'";
    $result=mysqli_query($this->conn,  $query);

   return $result;
}


public function filterrecord($searchfilterdata)
 {  
   

    $query=  $result = "SELECT * FROM `Customerdetails` bd INNER JOIN `Bookingdetails` cd ON bd.Customerid =cd.Customerid WHERE (Name like '$searchfilterdata%' OR Email like '$searchfilterdata%' OR Phoneno like '$searchfilterdata%'  OR roomtype like '$searchfilterdata%' OR roomsize like '$searchfilterdata%'  OR checkindate like '$searchfilterdata%' OR checkintime like '$searchfilterdata%' OR checkoutdate	 like '$searchfilterdata%' OR checkouttime like '$searchfilterdata%'OR cateringtype like '$searchfilterdata%'OR laundrytype like '$searchfilterdata%')  AND (Deleteuser='AVAILABLE' )";
    $result=mysqli_query($this->conn, $query);
    $data = array();
    
    while ($row = mysqli_fetch_array( $result)) {
     $data[] = $row;
    }
    return  json_encode($data);
}


public function filterrecordbydate($fromdate,$todate)
 {  
   

    $query=  $result = "SELECT * FROM `Customerdetails` bd INNER JOIN `Bookingdetails` cd ON bd.Customerid =cd.Customerid WHERE checkindate between '$fromdate' AND '$todate'  AND Deleteuser='AVAILABLE' order by checkindate ASC  ";
    $result=mysqli_query($this->conn, $query);
    $data = array();
    
    while ($row = mysqli_fetch_array( $result)) {
     $data[] = $row;
    }
    return  json_encode($data);
}



public function filterrecordbytodaydate($todaydate)
 {  
    $query ="Select * from   `Customerdetails` cd INNER JOIN `Bookingdetails` bd ON cd.Customerid =bd.Customerid
    where bd.checkindate='$todaydate'AND Deleteuser='AVAILABLE'";
    $result=mysqli_query($this->conn, $query); 
    $data = array();
    
    while ($row = mysqli_fetch_array( $result)) {
     $data[] = $row;
    }
    return  json_encode($data);
   
}

public function sortcolumndesc($columnname)
 {  
    if($columnname=='checkintime')
    {
        
        $query ="Select * from   `Customerdetails` cd INNER JOIN `Bookingdetails` bd ON cd.Customerid =bd.Customerid
        where cd.Deleteuser='AVAILABLE'
      order by STR_TO_DATE(checkintime,'%h:%i %p') desc ";
    }
    else if($columnname=='checkouttime')
    {
        
        $query ="Select * from   `Customerdetails` cd INNER JOIN `Bookingdetails` bd ON cd.Customerid =bd.Customerid
        where cd.Deleteuser='AVAILABLE'
      order by STR_TO_DATE(checkouttime,'%h:%i %p') desc ";

    }
    else{
    $query ="Select * from   `Customerdetails` cd INNER JOIN `Bookingdetails` bd ON cd.Customerid =bd.Customerid
     where cd.Deleteuser='AVAILABLE'
   order by $columnname desc ";
    }

    $result=mysqli_query($this->conn, $query); 
    
    while ($row = mysqli_fetch_array( $result)) {
        $data[] = $row;
       }
       return  json_encode($data);
   
}
public function sortcolumnasc($columnname)
 {  
    if($columnname=='checkintime')
    {
        
        $query ="Select * from   `Customerdetails` cd INNER JOIN `Bookingdetails` bd ON cd.Customerid =bd.Customerid
        where cd.Deleteuser='AVAILABLE'
      order by STR_TO_DATE(checkintime,'%h:%i %p') asc ";
    }
    else if($columnname=='checkouttime')
    {
        
        $query ="Select * from   `Customerdetails` cd INNER JOIN `Bookingdetails` bd ON cd.Customerid =bd.Customerid
        where cd.Deleteuser='AVAILABLE'
      order by STR_TO_DATE(checkouttime,'%h:%i %p') asc ";

    }
    else{
    $query ="Select * from   `Customerdetails` cd INNER JOIN `Bookingdetails` bd ON cd.Customerid =bd.Customerid
     where cd.Deleteuser='AVAILABLE'
   order by $columnname asc ";
    }

    $result=mysqli_query($this->conn, $query); 
    while ($row = mysqli_fetch_array( $result)) {
        $data[] = $row;
       }
       return  json_encode($data);
   
}

}?>








