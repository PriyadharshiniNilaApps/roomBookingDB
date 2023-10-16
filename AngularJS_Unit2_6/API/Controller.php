<?php
require_once 'Model.php';

class Controller {
    private $userModel;

    public function __construct() {
        $this->userModel = new Model();
    }

    public function getCustomerDetails() {

    }

    public function getUserData($name, $password){
        $this->userModel->getDetailsINDB($name, $password);
    }

    public function insertUserData($userData) {
        $this->userModel->insertDetailsINDB($userData);
    }

    public function insertCustomerData(){

    }

    public function updateCustomerDetails() {

    }

    public function deleteCustomerDetails() {

    }
}

$controller = new Controller();



if($_SERVER['REQUEST_METHOD'] === "POST"){
    $data = file_get_contents('php://input');
    $decodedData = json_decode($data, true);
if(isset($decodedData['action'])){
    if($decodedData['action'] === 'insertUserData'){   
     $controller->insertUserData($decodedData);
    }else if($decodedData['action'] == 'insertCustomerData'){
        $controller->insertCustomerData();
    }else if($decodedData['action'] == 'updateCustomerDetails'){
        $controller->updateCustomerDetails();
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
        }else if($_GET['action'] == 'getCustomerDetails'){
             $controller->getCustomerDetails();
        }else if($_GET['action'] == 'deleteCustomerDetails'){
              $controller->deleteCustomerDetails();
        }else{
            echo "Unknown action";
        }
    }else{
        echo "Action not specified";
    }
}

?>