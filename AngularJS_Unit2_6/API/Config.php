<?php
require_once 'Logger.php';
class Config {
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "Assessment_2";
   

    public function dbConnect() {
        $conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($conn->connect_error) {
            Logger::logApi("Database connection failed");
            die("Connection failed: " . $conn->connect_error);   
        }
        Logger::logApi("Database connection success");
        return $conn;

    }
}
?>
