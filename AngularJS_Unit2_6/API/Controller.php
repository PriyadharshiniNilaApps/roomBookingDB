<?php

require_once 'Model.php';

class Controller {
    private $userModel;
    public $failed = array(
        "status" => "Failed",
        "message" => "Not found",
    );

    public $success = array(
        "status" => "Success",
        "message" => "Data is inserted successfully"
    );
 
    public function __construct() {
        $this->userModel = new Model();
    }

    public function getAllBookingDetails($id) {
        $response = $this->userModel->getBookingDetailsINDB($id);
        if($response){
          echo json_encode($response);
        }else{
          echo json_encode($this-> failed);
        }
    }

    public function getUserData($name, $password){
        $response = $this->userModel->getUserDetailsINDB($name, $password);
        if($response){
            echo json_encode($response);
        }else{
            echo json_encode($this->failed);
        }
    }

    public function deleteBookingDetail($booking_id) {
        $response = $this->userModel->deleteDetailsINDB($booking_id);
        $this->success["message"] = "Data is deleted successfully";
        if($response){
            echo json_encode($this->success);
        }else{
            echo json_encode($this->failed);
            
        } 
    }
   
    public function insertUserData($userData) { 
        $response = $this->userModel->insertUserDetailsINDB($userData);
        $this->failed['message'] = "User already exists";
        if($response){
            echo json_encode($this->success);
        }else{
           echo json_encode($this->failed);
        }
    }
   
    public function insertBookingData($BookingData){
        $response = $this->userModel->insertBookingDetailsINDB($BookingData);
        $this->failed["messsage"] = "Already Booking";
        if($response){
            echo json_encode($this->success);
        }else{
            echo json_encode($this->failed);
        }
    }

    public function updateBookingDetail($BookingData) {
        $response = $this->userModel->updateDetailsINDB($BookingData);
        $this->success["message"] = "Data is updated successfully";
        if($response){
            echo json_encode($this->success);
        }else{
            echo json_encode($this->failed);
        } 

    }
}

$controller = new Controller();

$error = array(
    "status" => "Failed",
    "message" => "Invalid input data",
);

$response = json_encode($error);

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $data = file_get_contents('php://input');
    $decodedData = json_decode($data, true);
    $flag = true;
    foreach($decodedData as $key => $value){
        if(!empty($value)){
            $array[$key] = trim($value);
        }else{
            $flag = false;
        }
    }
    if(isset($decodedData['action'])){
        if($decodedData['action'] === 'insertUserData'){   
            if(!$flag || !isset($decodedData['name']) || !isset($decodedData['email']) || !isset($decodedData['phonenumber']) || !isset($decodedData['password']) || !isset($decodedData['usertype'])){
                echo $response;
            }else{
                $controller->insertUserData($decodedData);
            }
        }else if($decodedData['action'] == 'insertBookingData'){
            if(!$flag || !isset($decodedData['id']) || !isset( $decodedData['fullname']) || !isset($decodedData['gender'])  || !isset($decodedData['email']) || !isset($decodedData['idtype']) || !isset( $decodedData['age']) ||  !isset($decodedData['purpose']) || !isset($decodedData['phonenumber']) || !isset( $decodedData['idnumber']) || !isset($decodedData['roomtype']) || !isset($decodedData['checkindate'])  || !isset($decodedData['expectedcheckoutdate'])|| !isset($decodedData['cateringtype']) || !isset($decodedData['laundrytype']) || !isset( $decodedData['roomsize']) || !isset($decodedData['checkintime']) || !isset($decodedData['expectedcheckouttime']) ){
               echo $response;
            }else{
                $controller->insertBookingData($decodedData);
            }  
        }else if($decodedData['action'] == 'updateBookingDetail'){
            if(!$flag || !isset($decodedData['id']) || !isset( $decodedData['fullname']) || !isset($decodedData['gender'])  || !isset($decodedData['email']) || !isset($decodedData['idtype']) || !isset( $decodedData['age']) ||  !isset($decodedData['purpose']) || !isset($decodedData['phonenumber']) || !isset( $decodedData['idnumber']) || !isset($decodedData['roomtype']) || !isset($decodedData['checkindate'])  || !isset($decodedData['expectedcheckoutdate'])|| !isset($decodedData['cateringtype']) || !isset($decodedData['laundrytype']) || !isset( $decodedData['roomsize']) || !isset($decodedData['checkintime']) || !isset($decodedData['expectedcheckouttime']) ){
                echo $response;
             }else{
                $controller->updateBookingDetail($decodedData);
             }  
        }else{
            $error["message"] = "Unknown Action";
            echo json_encode($error);
        }
    }else{
        $error["message"] = "Action not specified";
        echo json_encode($error);
    }

}else if($_SERVER['REQUEST_METHOD'] === "GET"){
    if (isset($_GET['action'])) {
        $action = $_GET['action'];
        if ($action === 'getUserData') {
           if(empty($_GET['name']) || !isset($_GET['name']) || empty($_GET['password']) || !isset($_GET['password'])){
                echo $response;
           }else{
                $name = trim($_GET['name']);
                $password = trim($_GET['password']);
                $controller->getUserData($name, $password);
           }
        }else if($action == 'getAllBookingDetails'){
            if(empty($_GET['id']) || !isset($_GET['id'])){
                echo $response;
            }else{  
                $id = trim($_GET['id']);
                $controller->getAllBookingDetails($id);
            }
        }else if($action == 'deleteBookingDetail'){
            if(empty($_GET['booking_id']) || !isset($_GET['booking_id'])){
                echo $response;
            }else{
                $booking_id = trim($_GET['booking_id']);
                $controller->deleteBookingDetail($booking_id);
            }
        }else{
            $error["message"] = "Unknown Action";
            echo json_encode($unknown_action);
        }
    }else{
        $error["message"] = "Action not specified";
        echo json_encode($error);
    }
}else{
    $error["message"] = "Invalid Request";
    echo json_encode($invalid_request);
}

?>