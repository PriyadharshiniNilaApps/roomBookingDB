<?php
require_once 'Model.php';
// header("Content-Type:application/json");

class Controller {
    private $userModel;

    public function __construct() {
        $this->userModel = new Model();
    }

    public function getDetails() {

    }

    public function insertUserData($username, $email, $password, $phonenumber, $userType) {
            $this->userModel->insertDetailsINDB($username, $email, $password, $phonenumber, $userType);
    }

    public function updateDetails() {

    }

    public function deleteDetails() {

    }
}

$controller = new Controller();


$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "Assessment_2"; 

  $conn = new mysqli($servername, $username, $password, $database);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $name = $_POST["username"];
  $email = $_POST["email"];
  $password = $_POST["password"];

  $controller->insertDetails($name,$email,$password, $phonenumber, $userType);

//   $stmt = $conn->prepare("SELECT * FROM my_table_1 WHERE email = ?");
//   $stmt->bind_param("s", $email);
//   $stmt->execute();
//   $stmt->store_result();

//   if($stmt->num_rows > 0){
//     $response = "invalid credentials";
//   }else{
//     $stmt1 = $conn->prepare("INSERT INTO my_table_1 (username, email, password) VALUES (?, ?, ?)");
//     $stmt1->bind_param("sss", $name, $email, $password);
//     $stmt1-> execute();
//     $stmt1-> close();
//     $response = $email;
//   }

 

 




?>
