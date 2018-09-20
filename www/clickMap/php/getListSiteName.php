<?php

require 'config.php';
require 'checkToken.php';

$id = $_COOKIE['userId'];
$querySiteName = $mysql->query("SELECT `siteName` FROM `infoClick` WHERE `userId` = '$id' GROUP BY `siteName`");
$arrSiteName = $querySiteName->fetch_all();

$result = json_encode($arrSiteName, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
echo $result ;
?>