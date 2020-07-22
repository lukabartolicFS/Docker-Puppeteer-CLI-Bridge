<?php

require __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\Client;

$client = new Client([
  // Base URI is used with relative requests
  'base_uri' => 'localhost:1111'
]);

/*
 * Define URL to the pregenerated content to be turned into PDF
 */

$url = "https://dev.acarenet.com/webapp/userapi/memberdashboard/start/06-01-2020/end/07-02-2020/id/1774/tday/1/sur/0/cj/1/ce/1/key/f0bda020d2470f2e74990a07a607ebd9/selectedsurveylists/534,540,126,537/nam/Dashboard";

// HTML as source ("html")
//$contents = file_get_contents($url);

$response = $client->request('POST', 'convert', ["json" => ["url" => $url]]);
$pdfBinary = base64_decode($response->getBody()->getContents());

header("Content-type:application/pdf");
echo $pdfBinary;
