<?php
require_once 'Config.php';

class Model {
    private $conn;

    public function __construct() {
        $db = new Config();
        $this->conn = $db->dbConnect();
    }

    public function getDetailsINDB($name, $password) {
        $stmt = $this->conn->prepare("SELECT id FROM user_data WHERE name = ? && password = ?");
        $stmt->bind_param("ss", $name, $password);
        $stmt->execute();
        $stmt->bind_result($id);
        $stmt->store_result();
        if($stmt->num_rows > 0){
            $stmt->fetch();
           echo $id;
        }
          
    }

    public function insertDetailsINDB($userData) {
        
        $stmt = $this->conn->prepare("SELECT * FROM user_data WHERE name = ?");
        $stmt->bind_param("s", $userData['name']);
        $stmt->execute();
        $stmt->store_result();

    if($stmt->num_rows > 0){
        $response = "Username already exists";
    }else{
        $stmt1 = $this->conn->prepare("INSERT INTO user_data (name, email, phone_number, user_type, password) VALUES ( ?, ?, ?, ?, ?)");
        $stmt1->bind_param("sssss", $userData['name'], $userData['email'], $userData['phonenumber'], $userData['userType'],$userData['password']);
        $stmt1-> execute();
        $stmt1-> close();
        $response = true;
    }  
      echo $response;

    }

    public function updateDetailsINDB() {

    }

    public function deleteDetailsINDB() {
        
    }
}


?>
