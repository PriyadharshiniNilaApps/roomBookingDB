<?php
if($_SERVER['REQUEST_METHOD'] === 'POST' ){
    $jsonData = $_POST['value'];
     echo $jsonData;
    $filePath = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';
    $currentData = file_get_contents($filePath);
    $existingData = json_decode($currentData, true);
    $decodedData = json_decode($jsonData, true);
  
   
    if ($decodedData !== null) {
       foreach($existingData as &$object){
           if($object["customers"]["fullname"]=== $decodedData["fullname"] && $object["customers"]["phonenumber"] === $decodedData["phonenumber"]){
            $object["customers"]["email"]=== $decodedData["email"];
           }
         }
       

       $updatedData = json_encode($existingData, JSON_PRETTY_PRINT);

        if (file_put_contents($filePath, $updatedData) !== false) {
                echo 'Data has been successfully saved to data.json';
        } else {
                echo 'Error saving data to data.json: ' . error_get_last()['message'];
        }
    
    } else{
        echo 'Invalid JSON data';
    }




}else 
 if($_SERVER['REQUEST_METHOD'] === 'POST'&& isset($_POST['user_O']) ){
    $jsonData = $_POST['data'];
   
    $filePath = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';
    $currentData = file_get_contents($filePath);
    $existingData = json_decode($currentData, true);
    $decodedData = json_decode($jsonData, true);
  
   
    if ($decodedData !== null) {
       foreach($existingData as &$object){
            if($object['name'] === $_POST['user_O'] && $object['userType'] === $_POST['usertype']){
            $object["customers"][] = $decodedData;
         }
       }

       $updatedData = json_encode($existingData, JSON_PRETTY_PRINT);

        if (file_put_contents($filePath, $updatedData) !== false) {
                echo 'Data has been successfully saved to data.json';
        } else {
                echo 'Error saving data to data.json: ' . error_get_last()['message'];
        }
    } else {
            echo 'Invalid JSON data';
    }
}else if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $jsonData = $_POST['data'];
    $filePath = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';
    $currentData = file_get_contents($filePath);
    $existingData = json_decode($currentData, true);
    $decodedData = json_decode($jsonData, true);

    if ($decodedData !== null) {
        if (is_array($existingData)) {
            $existingData[] = $decodedData;
        } else {
            $existingData = [$decodedData];
        }

        $updatedData = json_encode($existingData, JSON_PRETTY_PRINT);

        if (file_put_contents($filePath, $updatedData) !== false) {
            echo 'Data has been successfully saved to data.json';
        } else {
            echo 'Error saving data to data.json: ' . error_get_last()['message'];
        }
        
    } else {
        echo 'Invalid JSON data';
    }
} 

?>