<?php
require_once 'Config.php';
require_once 'Logger.php';

class Model {
    private $conn;
  
    public function __construct() {
        $db = new Config();
        $this->conn = $db->dbConnect();
    }

    public function getUserDetailsINDB($name, $password) {
        try{
            $response = array();
            $stmt = $this->conn->prepare("SELECT id, name, email, phonenumber, usertype, password FROM user_data WHERE name = ? && password = ?");
            $stmt->bind_param("ss", $name, $password);
            $stmt->execute();
             $result = $stmt -> get_result();
            if($result->num_rows > 0){
                while($row = $result->fetch_assoc()){
                    $response[] = $row;
                }
                $stmt-> close();
                Logger::log("Database query for getUserDetails success");
                return $response;
            }else{
                Logger::log("User not found in the database");
                return false;
            }
           
        }catch(Exception $e){
            Logger::log("Database query failed: ".$e->getMessage());
        }
    }
  
    public function insertUserDetailsINDB($userData) {
    try{
        $stmt = $this->conn->prepare("SELECT * FROM user_data WHERE name = ?");
        $stmt->bind_param("s", $userData['name']);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result->num_rows > 0){
            Logger::log("User already exists in the database");
           return false;
        }else{
            $stmt = $this->conn->prepare("INSERT INTO user_data (name, email, phonenumber, usertype, password) VALUES ( ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssiss", $userData['name'], $userData['email'], $userData['phonenumber'], $userData['usertype'],$userData['password']);
            $stmt-> execute();
            $stmt->close();
            Logger::log("Database query  for insertUserDetails success");
            return true;
        }  
       
    }catch(Exception $e){
        Logger::log("Database query  for insertUserDetails failed".$e->getMessage());
   
    }
}

    public function insertBookingDetailsINDB($BookingData){
      try{
        $stmt = $this->conn->prepare("SELECT * FROM booking_data WHERE email = ?");
        $stmt->bind_param("s", $BookingData['email']);
        $stmt->execute();
        $result = $stmt->get_result();
        if($stmt->num_rows == 0){
            $stmt = $this->conn->prepare("INSERT INTO booking_data (id,fullname, gender,email, idtype,age,purpose, phonenumber, idnumber, roomtype, checkindate, expectedcheckoutdate, cateringType, laundryType, roomSize, checkintime, expectedcheckouttime) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("issssisiisssssiss", $BookingData['id'], $BookingData['fullname'], $BookingData['gender'], $BookingData['email'],$BookingData['idtype'], $BookingData['age'], $BookingData['purpose'], $BookingData['phonenumber'], $BookingData['idnumber'], $BookingData['roomtype'],$BookingData['checkindate'], $BookingData['expectedcheckoutdate'], $BookingData['cateringtype'], $BookingData['laundrytype'], $BookingData['roomsize'],$BookingData['checkintime'], $BookingData['expectedcheckintime']);
            $stmt-> execute();
            $stmt->close();
            Logger::log("Database query  for insertBookingDetails success");
            return true;
        }else{
            Logger::log("Already booked by the user");
            return false; 
        }  
      
    }catch(Exception $e){
       Logger::log("Database query  for insertBookingDetails failed".$e->getMessage());
    
    }
    }

    public function getBookingDetailsINDB($id){
        try{
        $response  = array();
        $stmt = $this->conn->prepare("SELECT id,fullname, gender,email, idtype,age,purpose, phonenumber, idnumber, roomtype, checkindate, expectedcheckoutdate, cateringType, laundryType, roomSize, checkintime, expectedcheckouttime FROM booking_data WHERE id = ?");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows > 0){
            while($row = $result->fetch_assoc()){
                $response[] = $row;
                $stmt-> close();
                Logger::log("Database query for getBookingDetails success");
                return $response;
            }
        }else{
            Logger::log("Not booking data found in the database");
            return false;
        }
     
    }catch(Exception $e){
        Logger::log("Database query for getBookingDetails failed". $e->getMessage());
     
    }
}

    public function updateDetailsINDB($BookingData) {
        try{
            $stmt = $this->conn->prepare("SELECT * FROM booking_data WHERE email = ?");
            $stmt->bind_param("s", $BookingData['email']);
            $stmt->execute();
            $result = $stmt->get_result();
            if($result->num_rows > 0){
                $stmt = $this->conn->prepare("UPDATE booking_data SET id=?,fullname=?, gender=?, idtype=?,age=?,purpose=?, phonenumber=?, idnumber=?, roomtype=?, checkindate=?, expectedcheckoutdate=?, cateringType=?, laundryType=?, roomSize=?, checkintime=?, expectedcheckouttime=? WHERE email = ?");
                $stmt->bind_param("issssisiisssssiss", $BookingData['id'], $BookingData['fullname'], $BookingData['gender'], $BookingData['idtype'], $BookingData['age'], $BookingData['purpose'], $BookingData['phonenumber'], $BookingData['idnumber'], $BookingData['roomtype'],$BookingData['checkindate'], $BookingData['expectedcheckoutdate'], $BookingData['cateringtype'], $BookingData['laundrytype'], $BookingData['roomsize'],$BookingData['checkintime'], $BookingData['expectedcheckintime'], $BookingData['email']);
                $stmt-> execute();
                $stmt->close();
                Logger::log("Database query  for updateDetails success");
               return true;
            }else{
                Logger::log("NO booking data found in the database");
                return false; 
            }  
        }catch(Exception $e){
           Logger::log("Database query  for updateDetails failed".$e->getMessage());
        
        }
    }

    public function deleteDetailsINDB($booking_id) {
      try{
        $stmt = $this->conn->prepare("SELECT * FROM booking_data WHERE booking_id = ?");
        $stmt ->bind_param("i", $booking_id);
        $stmt ->execute();
        $result = $stmt->get_result();
        if($result ->num_rows > 0){
            $stmt = $this->conn->prepare("DELETE FROM booking_data WHERE booking_id = ?");
            $stmt->bind_param("i", $booking_id);
            $stmt-> execute();
            $stmt-> close();
            Logger::log("Database query for deleteDetails success"); 
            return true;
        }else{
            Logger::log("No Booking data found in the database");
            return false;
        }
    }catch(Exception $e){
        Looger::log("Database query for deleteDetails failed". $e-> getMessage());
    }
    }

    public function __destruct(){
        $this->conn->close();
    }
}

?>
