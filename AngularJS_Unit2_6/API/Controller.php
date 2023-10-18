<?php
require_once 'Model.php';
$invalid_request = array(
    "status" => "Failed",
    "message" => "Invalid Request",
);

$unknown_action = array(
    "status" => "Failed",
    "message" => "Unknown Action",
);

$action_not_specified = array(
   "status" => "Failed",
   "message" => "Action is not specified",
);

$invalid_input = array(
    "status" => "Failed",
    "message" => "Invalid input data",
);


class Controller {
    private $userModel;
   
 
    public function __construct() {
        $this->userModel = new Model();
    }

    public function getAllBookingDetails($id) {
        $this->userModel->getBookingDetailsINDB($id);
    }

    public function getUserData($name, $password){
        if((!isset($name) && empty($name)) || (!isset($password) && empty($password))){
            echo "Invalid input data";
        }else{
            $this->userModel->getUserDetailsINDB($name, $password);
        }
    }

    public function insertUserData($userData) { 
        if(!isset($userData['name']) || !isset( $userData['email']) || !isset($userData['phonenumber']) || !isset($userData['userType']) || !isset($userData['password']) || !isset( $userData['reenteredPassword'])){
            echo "Some data are not found";
        }else if(empty($userData['name']) || empty($userData['email']) || empty($userData['phonenumber']) || empty($userData['userType']) || empty($userData['password']) || empty($userData['reenteredPassword'])){
            echo "Invalid input data";
        }else if(!filter_var($userData['email'], FILTER_VALIDATE_EMAIL)){
            echo "Invalid email address";
        }else if(!preg_match("/^\d{10}$/", $userData['phonenumber'])){
            echo "Invalid phonenumber";
        }else if($userData['password'] != $userData['reenteredPassword']){
            echo "Password doesn't matchs";
        }else{
            $this->userModel->insertUserDetailsINDB($userData);
        }
    }

    public function insertBookingData($BookingData){
        //Date checking

        $allowedGenders = ['Male', 'Female', 'Transgender'];
        $allowedIdType =  [ 'Aadhar card', 'Voter ID', 'PAN CARD', 'Driving Licence'];
        $allowedRoomType = ['Open','AC', 'NON - AC'];
        $allowedCateringType = ['Up to 5 persons VEG','Up to 10 persons VEG','Up to 5 persons NON-VEG','Up to 10 persons NON-VEG'];
        $allowedLaundryType =  ['Up to 10 clothes - Normal wash','Up to 20 clothes - Normal wash','Up to 10 clothes - Dry wash','Up to 20 clothes - Dry wash'];  
        $allowedRoomSize = ['1', '2', '3', '4' ];
    
        if(!isset($BookingData['id']) || !isset( $BookingData['fullName']) || !isset($BookingData['gender'])  || !isset($BookingData['email']) || !isset($BookingData['idType']) || !isset( $BookingData['age']) ||  !isset($BookingData['purpose']) || !isset($BookingData['phoneNumber']) || !isset( $BookingData['idNumber']) || !isset($BookingData['roomType']) || !isset($BookingData['checkInDate'])  ||  !isset( $BookingData['roomSize']) || !isset($BookingData['checkInTime'])  ){
            echo "Some data are not found";
        }else if(empty($BookingData['id']) || empty( $BookingData['fullName']) || empty($BookingData['gender']) || empty($BookingData['email'])  || empty($BookingData['idType']) || empty( $BookingData['age']) || empty($BookingData['purpose']) || empty($BookingData['phoneNumber']) || empty( $BookingData['idNumber']) || empty($BookingData['roomType']) || empty($BookingData['checkInDate']) || empty( $BookingData['roomSize'])|| empty($BookingData['checkInTime'])){
            echo "Invalid input data";
        }else if(!in_array($BookingData['gender'], $allowedGenders)){
            echo "Invalid gender value. Please choose from 'Male', 'Female', or 'Transgender'";
        }else if($BookingData['age'] < 18 || $BookingData['age'] > 120){
            echo "Age must be from 18 to 120";
        }else if(strlen($BookingData['purpose']) > 50){
            echo "Purpose length must be less than or equal to 50";
        }else if(!preg_match("/^[A-Za-z]+$/", $BookingData['fullName'])){
            echo "fullname must be have only alphabets";
        }else if(!in_array($BookingData['idType'], $allowedIdType)){
            echo "Invalid idtype value. Please choose from 'Aadhar card', 'Voter ID', 'PAN CARD' or 'Driving Licence'";
        }else if(!in_array($BookingData['roomType'], $allowedRoomType)){
            echo "Invalid roomtype value. Please choose from 'Open','AC' or 'NON - AC'";
        }else if(!in_array($BookingData['roomSize'],$allowedRoomSize)){
            echo "Invalid roomSize value. Please choose from '1', '2', '3' or '4' ";
        }else if(!in_array($BookingData['cateringType'], $allowedCateringType) && $BookingData['cateringType'] != null){
            echo "Invalid catering value. Please choose from 'Up to 5 persons VEG','Up to 10 persons VEG','Up to 5 persons NON-VEG' or 'Up to 10 persons NON-VEG'";
        }else if(!in_array($BookingData['laundryType'], $allowedLaundryType) && $BookingData['laundryType'] != null){
            echo "Invalid laundry value. 'Up to 10 clothes - Normal wash','Up to 20 clothes - Normal wash','Up to 10 clothes - Dry wash' or 'Up to 20 clothes - Dry wash'";
        }else if(!preg_match("/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/", $BookingData['checkInTime']) || (!preg_match("/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/",$BookingData['expectedCheckOutTime'] ) && !empty($BookingData['expectedCheckOutTime']))){
            echo "Invalid time";
        }else if($BookingData['checkInDate'] > $BookingData['expectedCheckOutDate'] || $BookingData['checkInDate'] <= date('Y-m-d') ){
            echo "Check in date must be earlier than Expected check out date or Check in date must be today or the days after";
        }else if(!filter_var($BookingData['email'], FILTER_VALIDATE_EMAIL)){
            echo "Invalid email address";
        }else if(!preg_match("/^\d{10}$/", $BookingData['phoneNumber'])){
            echo "Invalid phonenumber";
        }else{
            $this->userModel->insertBookingDetailsINDB($BookingData);
        }
    }

    public function updateBookingDetails() {
         //Checking common function

    }

    public function deleteBookingDetail($booking_id) {
        if(empty($booking_id) && !isset($booking_id)){
            echo "Invalid input data";
        }else{
            $this->userModel->deleteDetailsINDB($booking_id);
        }
    }
}

$controller = new Controller();


if($_SERVER['REQUEST_METHOD'] === "POST"){
    $data = file_get_contents('php://input');
    $decodedData = json_decode($data, true);
if(isset($decodedData['action'])){
    if($decodedData['action'] === 'insertUserData'){   
     $controller->insertUserData($decodedData);
    }else if($decodedData['action'] == 'insertBookingData'){
        $controller->insertBookingData($decodedData);
    }else if($decodedData['action'] == 'updateBookingDetail'){
        $controller->updateBookingDetail($decodedData);
    }else{
        echo "Unknown action";
    }
}else{
        echo "Action not specified";
}

}else if($_SERVER['REQUEST_METHOD'] === "GET"){
     if (isset($_GET['action'])) {
        $action = $_GET['action'];
        if ($action === 'getUserData') {
           $name = $_GET['name'];
           $password = $_GET['password'];
           $controller->getUserData($name, $password);
        }else if($action == 'getAllBookingDetails'){
            if(empty($_GET['id']) && !isset($_GET['id'])){
                $response = json_encode($invalid_input);
                echo $response;
            }else{  
                $id = trim($_GET['id']);
                $controller->getAllBookingDetails($id);
            }
        }else if($action == 'deleteBookingDetail'){
            $booking_id = $_GET['booking_id'];
            $controller->deleteBookingDetail($booking_id);
        }else{
            echo json_encode($unknown_action);
        }
    }else{
        echo json_encode($action_not_specified);
    }
}else{
    echo json_encode($invalid_request);
}

?>