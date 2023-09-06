<?php

if($_SERVER['REQUEST_METHOD'] === 'POST'&& isset($_POST['user']) ){
    $jsonData = $_POST['data'];
    $filePath = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';
    $currentData = file_get_contents($filePath);
    $existingData = json_decode($currentData, true);
  

    $decodedData = json_decode($jsonData, true);
    echo $decodedData;

    if ($decodedData !== null) {
       
      
       foreach($existingData as &$object){
        if($object['roomtype'] === $decodedData['roomtype'] && $object['roomSize']  === $decodedData['roomSize'] && $object['checkindate'] >= $decodedData['checkindate'])
        $object["customer"][] = $decodedData;
       }
        // foreach ($existingData['0']['user'] as &$user) {
        //     if ($user['userData']['roomtype'] === decodedData['roomtype']) {
        //         $user['userData']['roomtype']= decodedData['roomtype'];
        //     }
        // }
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

if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['user_1'])){
     
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