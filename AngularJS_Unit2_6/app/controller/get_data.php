<?php
$file = 'app/controller/data.json'; // Name of the file containing the data

if (file_exists($file)) {
  $data = file_get_contents($file);
  echo $data;
} else {
  echo 'Data not found';
}
?>
