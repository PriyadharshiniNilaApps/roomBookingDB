<?php

$file = '/opt/lampp/htdocs/Assessment_5/StayFlex-jul23/AngularJS_Unit2_6/app/controller/data.json';

if (file_exists($file)) {
  $data = file_get_contents($file);
  echo $data;
} else {
  echo 'Data not found';
}

?>
