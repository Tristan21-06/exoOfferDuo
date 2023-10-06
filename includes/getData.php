<?php

$path = "../localDB/DB.json";
$jsonString = file_get_contents($path);
$jsonData = json_decode($jsonString, true);

echo json_encode($jsonData);