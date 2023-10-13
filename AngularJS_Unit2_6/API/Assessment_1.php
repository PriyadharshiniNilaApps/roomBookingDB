<?php

$digitArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
global $digitArray;
function addDigits($input) {
    $digit = str_split($input);
    $sum = array_sum($digit);
    return $sum;
}

function processString($input) {
    if (!empty($input) && isset($input)) {
        $str = trim($input);
        if (strlen($str) > 3) {
            $flag = true;
            for ($i = 0; $i < strlen($str); $i++) {
                if (!in_array($str[$i], $digitArray)) {
                    $flag = false;
                    break;
                }
            }

            if ($flag) {
                return addDigits($str);
            } else {
                $s = strtolower($str);
                $output = implode('+', str_split($s));
                return $output;
            }
        } else {
            return "Input string length must be greater than 3.";
        }
    } else {
        return "Input string is empty or null.";
    }
}
$email = "someone@example.com";

try {
  //check if
  if(filter_var($email, FILTER_VALIDATE_EMAIL) === FALSE) {
    //throw exception if email is not valid
    throw new customException($email);
  }
}

catch (customException $e) {
  //display custom message
  echo e;
}


$input = "123456";
$result = processString($input);
echo $result;
?>
