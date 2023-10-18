<?php

$digitArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function addDigits($input) {
    $digit = str_split($input);
    $sum = array_sum($digit);
    return $sum;
}

function processString($input) {
    global $digitArray;
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

$input = "06012000";
echo processString($input);
?>
