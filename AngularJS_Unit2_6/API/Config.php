<?php
require_once 'Logger.php';
class Config {
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "Assessment_2";

    public function dbConnect() {
    try{
        $conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        Logger::log("Database connection success");
        return $conn;
    }catch(Exception $e){
        Logger::log("Database connection failed".$e->getMessage());
    }
      

    }
}
?>
