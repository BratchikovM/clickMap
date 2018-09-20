<?php

require 'config.php';
require 'checkToken.php';

$infoClickX = (integer)$mysql->real_escape_string($_POST['x']);
$infoClickY = (integer)$mysql->real_escape_string($_POST['y']);
$infoClickTs = (integer)$mysql->real_escape_string($_POST['ts']);
$widthWindow = (integer)$mysql->real_escape_string($_POST['widthWindow']);
$heightWindow = (integer)$mysql->real_escape_string($_POST['heightWindow']);
$siteName = $mysql->real_escape_string($_POST['siteName']);
$userId = (integer)$_COOKIE['userId'];
$query = $mysql->query("INSERT INTO `infoClick` VALUE (NULL, '$infoClickX', '$infoClickY', '$infoClickTs', '$widthWindow', '$heightWindow', '$siteName', '$userId')");