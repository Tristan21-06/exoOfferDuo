<?php

$myfile = fopen("../localDB/DB.json", "w");
$txt = json_decode($_GET['jsonString']);
echo json_encode($txt);
fwrite($myfile, json_encode($txt));
fclose($myfile);