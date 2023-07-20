
<?php

$connect = mysqli_connect("localhost", "root", "", "angular");


$query = "SELECT * FROM `Customerdetails` bd INNER JOIN `Bookingdetails` cd ON bd.Customerid =cd.Customerid
where selectuser='SELECTED'AND Deleteuser='AVAILABLE' order by Name ASC";

$result = mysqli_query($connect, $query);

    $separator = ",";
    $filename = "Roombookingcustomerdata.csv";

    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="'. $filename .'";'); 
    $output = fopen('php://output', 'w');

    $csvheader= array( 'Name','Email','Phoneno','roomtype','roomsize','checkindate','checkintime','checkoutdate','checkouttime','cateringtype','laundrytype');
    fputcsv($output, $csvheader, $separator);
    

    $data = array();
    while($row = mysqli_fetch_array($result))
    { 
        
        $data[] = array("Name"=>$row['Name'],"Email"=>$row['Email'],"Phoneno"=>$row['Phoneno'],"roomtype"=>$row['roomtype'],"roomsize"=>$row['roomsize'],"checkindate"=>$row['checkindate'],"checkintime"=>$row['checkintime'],
        "checkoutdate"=>$row['checkoutdate'],"checkouttime"=>$row['checkouttime'],"cateringtype"=>$row['cateringtype'],"laundrytype"=>$row['laundrytype']
       );

    }
   
    foreach ($data as $customerdata)
    {
	fputcsv($output,$customerdata,$separator);
    }
    
    fclose($output);
   
    
?>