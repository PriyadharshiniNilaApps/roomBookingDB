<?php
require_once 'Config.php';

class Model {
    private $conn;

    public function __construct() {
        $db = new Config();
        $this->conn = $db->dbConnect();
    }

    public function getDetailsINDB() {

    }

    public function insertDetailsINDB($username, $email, $password) {
        $stmt1 =$this->conn->prepare("INSERT INTO my_table_1 (username, email, password) VALUES (?, ?, ?)");
        $stmt1->bind_param("sss", $username, $email, $password);
        $stmt1-> execute();
        $stmt1-> close();
        $response = $email;
        $response = json_encode($response);
        echo $response;
    }

    public function updateDetailsINDB() {

    }

    public function deleteDetailsINDB() {
        
    }
}
?>
