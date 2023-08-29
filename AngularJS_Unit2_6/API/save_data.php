<?php
$data = $_POST['data']; // Assuming the data is sent as a POST parameter
$file = 'data.json'; // Name of the file to save the data

file_put_contents($file, json_encode($data));

echo 'Data saved successfully';
?>