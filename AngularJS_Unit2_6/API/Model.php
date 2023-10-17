<?php
require_once 'Config.php';

class Model {
    private $conn;

    public function __construct() {
        $db = new Config();
        $this->conn = $db->dbConnect();
    }

    public function getUserDetailsINDB($name, $password) {
        $response = "No user found";
        $stmt = $this->conn->prepare("SELECT id, name, email, phonenumber, usertype, password FROM user_data WHERE name = ? && password = ?");
        $stmt->bind_param("ss", $name, $password);
        $stmt->execute();
        $stmt->bind_result($id, $name, $email, $phone_number, $user_type , $password);
        $stmt->store_result();
        if($stmt->num_rows > 0){
            $results = array();
            while($stmt->fetch()){
                $row = array(
                    'id' => $id,
                    'name' => $name,
                    'email' => $email,
                    'phone_number' => $phone_number,
                    'user_type' => $user_type,
                    'password' => $password
                );
                $results[] = $row;
            }
            $response = json_encode($results);
        }  
        $stmt-> close();
        echo $response;
    }
  
    public function insertUserDetailsINDB($userData) {
        $stmt = $this->conn->prepare("SELECT * FROM user_data WHERE name = ?");
        $stmt->bind_param("s", $userData['name']);
        $stmt->execute();
        $stmt->store_result();

        if($stmt->num_rows > 0){
            $response = "Username already exists";
        }else{
            $stmt1 = $this->conn->prepare("INSERT INTO user_data (name, email, phonenumber, usertype, password) VALUES ( ?, ?, ?, ?, ?)");
            $stmt1->bind_param("ssiss", $userData['name'], $userData['email'], $userData['phonenumber'], $userData['userType'],$userData['password']);
            $stmt1-> execute();
          
            $response = "User data is added";
        }  
        $stmt->close();
        $stmt1-> close();
        echo $response;
    }

    public function insertBookingDetailsINDB($BookingData){
        $stmt = $this->conn->prepare("SELECT * FROM user_data WHERE id = ?");
        $stmt->bind_param("i", $BookingData['id']);
        $stmt->execute();
        $stmt->store_result();

        if($stmt->num_rows == 0){
            $response = "No user found";
        }else{
            $stmt1 = $this->conn->prepare("INSERT INTO booking_data (id,fullname, gender,email, idtype,age,purpose, phonenumber, idnumber, roomtype, checkindate, expectedcheckoutdate, cateringType, laundryType, roomSize, checkintime, expectedcheckouttime) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt1->bind_param("issssisiisssssiss", $BookingData['id'], $BookingData['fullName'], $BookingData['gender'], $BookingData['email'],$BookingData['idType'],
                                                    $BookingData['age'], $BookingData['purpose'], $BookingData['phoneNumber'], $BookingData['idNumber'], $BookingData['roomType'],
                                                    $BookingData['checkInDate'], $BookingData['expectedCheckOutDate'], $BookingData['cateringType'], $BookingData['laundryType'], $BookingData['roomSize'],
                                                    $BookingData['checkInTime'], $BookingData['expectedCheckInTime']);
            $stmt1-> execute();
            $response = "User data is added";
        }  
        $stmt->close();
        $stmt1-> close();
        echo $response;
    }

    public function getBookingDetaulsINDB(){

    }

    public function updateDetailsINDB() {

    }

    public function deleteDetailsINDB() {
        
    }

    public function __destruct(){
        $this->conn->close();

    }
}


?>
