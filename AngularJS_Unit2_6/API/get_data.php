<?php

$file = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';
if(isset($_GET['user']) && $_SERVER['REQUEST_METHOD'] === 'GET'){
   $currentData = file_get_contents($file);
    $existingData = json_decode($currentData, true);
    foreach($existingData as $key => $item){
      if($item["name"] === $_GET['user'] &&   $item["userType"] === $_GET['usertype']){
        foreach ($item['customers'] as $values) {
          $resultArray[] = [
              'index' => $values['index'],
              'fullname'=> $values['fullname'],
              'gender'=> $values['gender'],
              'email'=> $values['email'],
              'idtype'=> $values['idtype'],
              'age'=> $values['age'],
              'purpose'=> $values['purpose'],
              'phonenumber'=> $values['phonenumber'],
              'idnumber'=>$values['idnumber'],
              'roomtype'=> $values['roomtype'],
              'checkindate'=> $values['checkindate'],
              'expectedcheckoutdate'=> $values['expectedcheckoutdate'],
              'cateringType'=> $values['cateringType'],
              'laundryType'=> $values['laundryType'],
              'roomSize'=> $values['roomSize'],
              'checkintime'=> $values['checkintime'],
              'expectedcheckouttime'=> $values['expectedcheckouttime'],
              'userType'=> $values['userType'],
              'view'=> $values['view'],
              'customer'=>$values['customer']
          ];
      }
    }
          
        
      
}
header('Content-Type => application/json');
echo json_encode($resultArray);
}


if (file_exists($file)) {
  $currentData = file_get_contents($file);
  $existingData = json_decode($currentData, true);
  foreach($existingData as $key => $item){
    if($item["name"] === $_POST['username'] &&  $item["userType"] === $_POST['userType']){
        echo $item["userType"];
  } 
      
    }

 
} else {
  echo 'Data not found';
}

?>