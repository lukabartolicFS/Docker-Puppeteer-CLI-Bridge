<?php

/*
 * Define URL to the pregenerated content to be turned into PDF
 */

$url = "https://dev.acarenet.com/webapp/userapi/memberdashboard/start/06-01-2020/end/07-02-2020/id/1774/tday/1/sur/0/cj/1/ce/1/key/f0bda020d2470f2e74990a07a607ebd9/selectedsurveylists/534,540,126,537/nam/Dashboard";

// get the outputted binary file
$fileBinary = shell_exec("node client.js {$url}");

//file_put_contents('my.pdf', $fileBinary);

// sets the correct content type header and prints the PDF file as response
header("Content-type:application/pdf");
echo $fileBinary;
