<?php
class Logger {
 public static function log($message) {
 $filePath =  '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/API/logs.txt';
 $date = date('Y-m-d H:i:s');
 $logMessage = "[$date] $message" . PHP_EOL;
 file_put_contents($filePath, $logMessage, FILE_APPEND);
 }
}

?>